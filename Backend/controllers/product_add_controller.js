const express = require("express");
require("dotenv").config();

const Camera = require("../models/CameraModel");
//multer
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 2000000 } });
// cloudinary
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "doczwegcp",
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: "PGC3fgjTkvUiUkDM4yZ_XrFw1AQ",
});

exports.create_product_get = async (req, res) => {
  res.json({ mssg: "Not yet implemented" });
};
exports.create_product_post = async (req, res) => {
  res.json({ mssg: "Not yet implemented" });
};
exports.update_product_get = async (req, res) => {
  res.json({ mssg: "Not yet implemented" });
};
exports.update_product_post = [
  upload.single("image"),
  async (req, res) => {
    const {
      name,
      description,
      brand,
      category,
      model,
      condition,
      featured,
      price,
      max_res,
    } = req.body;
    const image = req.file.buffer.toString("base64");
    const imageType = req.file.mimetype;

    try {
      const result = await cloudinary.uploader.upload(
        `data:${imageType};base64,${image}`,
        {
          folder: "cameras",
        }
      );
      const camera = await Camera.create({
        name,
        description,
        brand,
        category,
        model,
        condition,
        featured,
        price,
        max_res,
        image: { public_id: result.public_id, url: result.secure_url },
      });
      res.status(200).json(camera);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
];
