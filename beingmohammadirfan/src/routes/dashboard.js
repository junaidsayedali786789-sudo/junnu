const express = require("express");

const Donation = require("../models/Donation");

const router = express.Router();

function requireAdmin(req, res, next) {
  const expectedToken = process.env.ADMIN_DASHBOARD_TOKEN;
  if (!expectedToken) {
    return next();
  }

  const bearer = req.get("authorization") || "";
  const token = bearer.startsWith("Bearer ")
    ? bearer.slice("Bearer ".length)
    : req.get("x-admin-token");

  if (token !== expectedToken) {
    return res.status(401).json({ message: "Dashboard access is not authorized" });
  }

  next();
}

router.use(requireAdmin);

router.get("/summary", async (req, res, next) => {
  try {
    const [statusTotals, categoryTotals, recentDonations] = await Promise.all([
      Donation.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
            amount: { $sum: "$amount" }
          }
        }
      ]),
      Donation.aggregate([
        {
          $group: {
            _id: "$message",
            count: { $sum: 1 },
            amount: { $sum: "$amount" }
          }
        },
        { $sort: { amount: -1 } },
        { $limit: 8 }
      ]),
      Donation.find({})
        .sort({ createdAt: -1 })
        .limit(10)
        .select("donorName amount status message createdAt receipt")
        .lean()
    ]);

    const totals = statusTotals.reduce(
      (acc, item) => {
        acc.donations += item.count;
        acc.amount += item.amount;
        acc.byStatus[item._id || "unknown"] = {
          count: item.count,
          amount: item.amount
        };
        if (item._id === "paid") {
          acc.paidAmount = item.amount;
          acc.paidDonations = item.count;
        }
        return acc;
      },
      { donations: 0, amount: 0, paidAmount: 0, paidDonations: 0, byStatus: {} }
    );

    res.json({
      totals,
      categories: categoryTotals.map((item) => ({
        name: item._id || "General support",
        count: item.count,
        amount: item.amount
      })),
      recentDonations
    });
  } catch (error) {
    next(error);
  }
});

router.use((error, req, res, next) => {
  res.status(500).json({ message: "Could not load dashboard data" });
});

module.exports = router;
