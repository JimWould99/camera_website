const express = require("express");
const Camera = require("../models/CameraModel");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 2000000 } });

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
      featured,
      price,
      max_res,
    } = req.body;

    try {
      const camera = await Camera.create({
        name,
        description,
        brand,
        category,
        model,
        featured,
        price,
        max_res,
        image: { data: req.file.buffer, contentType: req.file.mimetype },
      });
      res.status(200).json(camera);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
];
