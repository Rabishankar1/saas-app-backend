const mongoose = require("mongoose");
const priceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  monthly: {
    type: Number,
    required: true,
    unique: true,
  },
  yearly: {
    type: Number,
    required: true,
    unique: true,
  },
  features: {
    type: Array,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Prices", priceSchema, "prices");
