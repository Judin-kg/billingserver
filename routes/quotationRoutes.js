const express = require("express");
const router = express.Router();
const Quotation = require("../models/Quotation");

/* =========================
   GET ALL QUOTATIONS
========================= */
router.get("/", async (req, res) => {
  try {
    const quotations = await Quotation.find().sort({ _id: -1 });
    res.json(quotations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   CREATE QUOTATION
========================= */
router.post("/", async (req, res) => {
  try {
    const quotation = new Quotation({
      quotationNo: req.body.quotationNo,
      billTo: req.body.billTo,
      items: req.body.items || [],
      total: Number(req.body.total)
    });

    await quotation.save();
    res.status(201).json(quotation);
  } catch (err) {
    console.error("SAVE ERROR:", err.message);
    res.status(400).json({ error: err.message });
  }
});

/* =========================
   DELETE QUOTATION
========================= */
router.delete("/:id", async (req, res) => {
  try {
    await Quotation.findByIdAndDelete(req.params.id);
    res.json({ message: "Quotation deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
