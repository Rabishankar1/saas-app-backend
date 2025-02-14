const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const itemSchema = new mongoose.Schema({
  price: {
    type: number,
    required: [true, "Item price is required"],
  },
  name: {
    type: String,
    required: [true, "Item name is required"],
  },
  image: {
    publicId: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Item", itemSchema);
