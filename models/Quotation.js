const mongoose = require("mongoose");

const QuotationSchema = new mongoose.Schema({
  quotationNo: {
    type: String,
    required: true,
    unique: true
  },
  billTo: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    default: []
  },
  total: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    default: () => new Date().toLocaleDateString("en-GB")
  }
});

module.exports = mongoose.model("Quotation", QuotationSchema);
