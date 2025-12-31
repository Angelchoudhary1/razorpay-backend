const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ CORS FIX (IMPORTANT)
app.use(cors({
  origin: [
    "https://choeducationandtrust.org",
    "https://choeducationandtrust.netlify.app"
  ],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

const razorpay = new Razorpay({
  key_id: process.env.rzp_live_RyG6HUaFJ9godF,
  key_secret: process.env.hv6bhJywrF7J5oX0xwcaidMA
});

app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "donation_" + Date.now()
    });

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on", PORT));
