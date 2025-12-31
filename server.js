const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = "./quotations.json";

const readData = () => {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE));
};

const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

/* GET */
app.get("/api/quotations", (req, res) => {
  res.json(readData());
});

/* POST */
app.post("/api/quotations", (req, res) => {
  const data = readData();
  data.push(req.body);
  writeData(data);
  res.json({ message: "Quotation saved" });
});

/* DELETE */
app.delete("/api/quotations/:quotationNo", (req, res) => {
  const data = readData();
  const updated = data.filter(
    q => q.quotationNo !== req.params.quotationNo
  );
  writeData(updated);
  res.json({ message: "Quotation deleted" });
});

/* UPDATE */
app.put("/api/quotations/:quotationNo", (req, res) => {
  const data = readData();
  const updated = data.map(q =>
    q.quotationNo === req.params.quotationNo
      ? { ...q, ...req.body }
      : q
  );
  writeData(updated);
  res.json({ message: "Quotation updated" });
});

app.listen(PORT, () =>
  console.log(`✅ Backend running on http://localhost:${PORT}`)
);
