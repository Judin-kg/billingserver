const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = "./quotations.json";

/* =========================
   HELPER FUNCTIONS
========================= */
const readData = () => {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
};

const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

/* =========================
   ROOT ROUTE (FIXES Cannot GET /)
========================= */
app.get("/", (req, res) => {
  res.send("✅ RJ Atlas Digital AI Billing Backend is running");
});

/* =========================
   GET ALL QUOTATIONS
========================= */
app.get("/api/quotations", (req, res) => {
  const quotations = readData();
  res.json(quotations);
});

/* =========================
   SAVE NEW QUOTATION
========================= */
app.post("/api/quotations", (req, res) => {
  const quotations = readData();

  const newQuotation = {
    quotationNo: req.body.quotationNo,
    billTo: req.body.billTo,
    items: req.body.items || [],
    total: Number(req.body.total || 0),
    date: req.body.date
  };

  quotations.push(newQuotation);
  writeData(quotations);

  res.status(201).json({ message: "Quotation saved successfully" });
});

/* =========================
   UPDATE QUOTATION
========================= */
app.put("/api/quotations/:quotationNo", (req, res) => {
  const quotations = readData();

  const updated = quotations.map((q) =>
    q.quotationNo === req.params.quotationNo
      ? { ...q, ...req.body }
      : q
  );

  writeData(updated);
  res.json({ message: "Quotation updated successfully" });
});

/* =========================
   DELETE QUOTATION
========================= */
app.delete("/api/quotations/:quotationNo", (req, res) => {
  const quotations = readData().filter(
    (q) => q.quotationNo !== req.params.quotationNo
  );

  writeData(quotations);
  res.json({ message: "Quotation deleted successfully" });
});

/* =========================
   START SERVER
========================= */
app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
