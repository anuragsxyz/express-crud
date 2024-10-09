const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    lowercase: true,
    enum: ["fruits", "vegetables", "dairy"],
  },
});

const Prodcut = mongoose.model("Products", productSchema);

module.exports = Prodcut;
