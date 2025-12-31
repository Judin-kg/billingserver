const mongoose = require("mongoose");

const QuotationSchema = new mongoose.Schema({
  quotationNo: {
    type: String,
    required: true
  },
  billTo: {
    type: String
  },
  items: [
    {
      description: String,
      price: Number
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Quotation", QuotationSchema);
