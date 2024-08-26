const express = require("express");
const Camera = require("../models/CameraModel");

exports.delete_product_get = async (req, res) => {
  res.json({ mssg: "Not yet implemented" });
};

exports.delete_product_post = async (req, res) => {
  await Camera.findByIdAndDelete(req.body.id);
  res.status(200).json({ msg: "successfully deleted" });
};
