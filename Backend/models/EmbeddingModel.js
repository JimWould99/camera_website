const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EmbeddingSchema = new Schema(
  {
    embeddings: { type: Array },
    name: { type: Object },
    description: { type: String },
    brand: { type: String },
    category: { type: String },
    model: { type: String },
    condition: { type: String },
    price: { type: Number },
    max_res: { type: Number },
    cam_id: { type: String },
    image: { public_id: { type: String }, url: { type: String } },
  },
  { timestamps: true }
);
EmbeddingSchema.virtual("url").get(function () {
  return "api/product/" + this.cam_id;
});
module.exports = mongoose.model("embedding", EmbeddingSchema);
