const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CameraSchema = new Schema(
  {
    name: { type: Object, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    model: { type: String, required: true },
    condition: { type: String },
    featured: { type: Boolean, required: true },
    stock_no: { type: Number },
    price: { type: Number, required: true },
    max_res: { type: Number, required: true },
    image: { public_id: { type: String }, url: { type: String } },
    user: [{ type: Schema.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

CameraSchema.virtual("url").get(function () {
  return "api/product/" + this._id;
});

module.exports = mongoose.model("product", CameraSchema);
