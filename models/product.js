let mongoose = require("mongoose");

let productSchema = mongoose.Schema({
  description: String,
  title: String,
  images: [String],
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    username: String,
  },
});

module.exports = mongoose.model("product", productSchema);
