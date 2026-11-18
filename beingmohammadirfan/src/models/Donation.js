const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    donorName: { type: String, trim: true, maxlength: 80 },
    email: { type: String, trim: true, lowercase: true, maxlength: 120 },
    phone: { type: String, trim: true, maxlength: 20 },
    amount: { type: Number, required: true, min: 1 },
    currency: { type: String, default: "INR", enum: ["INR"] },
    message: { type: String, trim: true, maxlength: 240 },
    razorpayOrderId: { type: String, required: true, unique: true },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
    razorpayQrId: { type: String },
    razorpayQrImageUrl: { type: String },
    status: {
      type: String,
      enum: ["created", "qr_created", "paid", "failed"],
      default: "created"
    },
    receipt: { type: String, required: true, unique: true },
    metadata: {
      ipHash: String,
      userAgent: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donation", donationSchema);
