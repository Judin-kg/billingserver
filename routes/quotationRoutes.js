const express = require("express");
const router = express.Router();
const Quotation = require("../models/Quotation");

// CREATE QUOTATION
router.post("/", async (req, res) => {
  try {
    const quotation = new Quotation(req.body);
    await quotation.save();
    res.status(201).json(quotation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET ALL QUOTATIONS (ADMIN)
router.get("/", async (req, res) => {
  try {
    const quotations = await Quotation.find().sort({ createdAt: -1 });
    res.json(quotations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
