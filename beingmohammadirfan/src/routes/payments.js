const crypto = require("crypto");
const express = require("express");
const Razorpay = require("razorpay");
const { z } = require("zod");

const Donation = require("../models/Donation");

const router = express.Router();

const donationInput = z.object({
  donorName: z.string().trim().max(80).optional().default("Kind supporter"),
  email: z.string().trim().email().max(120).optional().or(z.literal("")),
  phone: z.string().trim().min(8).max(20).optional().or(z.literal("")),
  amount: z.coerce.number().int().min(10).max(500000),
  message: z.string().trim().max(240).optional().or(z.literal(""))
});

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

function requireRazorpayKeys() {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    const error = new Error("Razorpay keys are not configured");
    error.statusCode = 500;
    throw error;
  }
}

function hashIp(ip) {
  return crypto.createHash("sha256").update(ip || "unknown").digest("hex");
}

function verifyCheckoutSignature(orderId, paymentId, signature) {
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

async function createQrCode({ amount, receipt, donorName, donationId }) {
  const auth = Buffer.from(
    `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
  ).toString("base64");

  const response = await fetch("https://api.razorpay.com/v1/payments/qr_codes", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      type: "upi_qr",
      name: "SUPPOREM.org Donation",
      usage: "single_use",
      fixed_amount: true,
      payment_amount: amount * 100,
      description: `Donation by ${donorName}`,
      notes: {
        receipt,
        donationId: donationId.toString()
      }
    })
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Razorpay QR creation failed: ${body}`);
  }

  return response.json();
}

router.get("/config", (req, res) => {
  res.json({
    keyId: process.env.RAZORPAY_KEY_ID || "",
    currency: "INR"
  });
});

router.post("/order", async (req, res, next) => {
  try {
    requireRazorpayKeys();
    const data = donationInput.parse(req.body);
    const receipt = `supporem_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;

    const order = await razorpay.orders.create({
      amount: data.amount * 100,
      currency: "INR",
      receipt,
      notes: {
        donorName: data.donorName,
        purpose: "SUPPOREM.org donation"
      }
    });

    const donation = await Donation.create({
      donorName: data.donorName,
      email: data.email || undefined,
      phone: data.phone || undefined,
      amount: data.amount,
      message: data.message || undefined,
      razorpayOrderId: order.id,
      receipt,
      metadata: {
        ipHash: hashIp(req.ip),
        userAgent: req.get("user-agent")
      }
    });

    res.status(201).json({
      donationId: donation._id,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt
    });
  } catch (error) {
    next(error);
  }
});

router.post("/qr", async (req, res, next) => {
  try {
    requireRazorpayKeys();
    const data = donationInput.parse(req.body);
    const receipt = `supporem_qr_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;

    const donation = await Donation.create({
      donorName: data.donorName,
      email: data.email || undefined,
      phone: data.phone || undefined,
      amount: data.amount,
      message: data.message || undefined,
      razorpayOrderId: `qr_pending_${receipt}`,
      receipt,
      status: "created",
      metadata: {
        ipHash: hashIp(req.ip),
        userAgent: req.get("user-agent")
      }
    });

    const qr = await createQrCode({
      amount: data.amount,
      receipt,
      donorName: data.donorName,
      donationId: donation._id
    });

    donation.razorpayQrId = qr.id;
    donation.razorpayQrImageUrl = qr.image_url;
    donation.status = "qr_created";
    await donation.save();

    res.status(201).json({
      donationId: donation._id,
      qrId: qr.id,
      imageUrl: qr.image_url,
      amount: data.amount,
      currency: "INR"
    });
  } catch (error) {
    next(error);
  }
});

router.post("/verify", async (req, res, next) => {
  try {
    requireRazorpayKeys();
    const payload = z
      .object({
        razorpay_order_id: z.string(),
        razorpay_payment_id: z.string(),
        razorpay_signature: z.string()
      })
      .parse(req.body);

    const donation = await Donation.findOne({
      razorpayOrderId: payload.razorpay_order_id
    });

    if (!donation) {
      return res.status(404).json({ message: "Donation order not found" });
    }

    const valid = verifyCheckoutSignature(
      donation.razorpayOrderId,
      payload.razorpay_payment_id,
      payload.razorpay_signature
    );

    if (!valid) {
      donation.status = "failed";
      await donation.save();
      return res.status(400).json({ message: "Payment signature verification failed" });
    }

    donation.razorpayPaymentId = payload.razorpay_payment_id;
    donation.razorpaySignature = payload.razorpay_signature;
    donation.status = "paid";
    await donation.save();

    res.json({ ok: true, status: "paid" });
  } catch (error) {
    next(error);
  }
});

router.post("/webhook", async (req, res, next) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!webhookSecret) {
      return res.status(500).json({ message: "Webhook secret is not configured" });
    }

    const signature = req.get("x-razorpay-signature") || "";
    const expected = crypto
      .createHmac("sha256", webhookSecret)
      .update(req.body)
      .digest("hex");

    if (!signature || !crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))) {
      return res.status(400).json({ message: "Invalid webhook signature" });
    }

    const event = JSON.parse(req.body.toString("utf8"));
    const payment = event.payload?.payment?.entity;
    const qrCode = event.payload?.qr_code?.entity;

    if (event.event === "payment.captured" && payment?.order_id) {
      await Donation.findOneAndUpdate(
        { razorpayOrderId: payment.order_id },
        { status: "paid", razorpayPaymentId: payment.id },
        { new: true }
      );
    }

    if (event.event === "qr_code.credited" && qrCode?.id && payment?.id) {
      await Donation.findOneAndUpdate(
        { razorpayQrId: qrCode.id },
        { status: "paid", razorpayPaymentId: payment.id },
        { new: true }
      );
    }

    res.json({ received: true });
  } catch (error) {
    next(error);
  }
});

router.use((error, req, res, next) => {
  if (error instanceof z.ZodError) {
    return res.status(400).json({ message: "Please check the donation details", issues: error.issues });
  }

  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    message: statusCode === 500 ? "Something went wrong. Please try again." : error.message
  });
});

module.exports = router;
