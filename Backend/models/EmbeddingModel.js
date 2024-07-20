const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EmbeddingSchema = new Schema(
  {
    e_name: { type: Array },
    e_description: { type: String, required: true },
    e_price: { type: Number, required: true },
  },
  { timestamps: true }
);

EmbeddingSchema.virtual("url").get(function () {
  return "api/product/" + this._id;
});

module.exports = mongoose.model("embedding", EmbeddingSchema);
