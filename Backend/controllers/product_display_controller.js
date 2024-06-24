const express = require("express");
const Camera = require("../models/CameraModel");

// remove name limiter later
exports.home = async (req, res) => {
  const [recentlyAddedCameras, featuredCameras] = await Promise.all([
    Camera.find({}, { name: 1 }).limit(10).sort({ createdAt: -1 }).exec(),
    Camera.find({ featured: true }, { name: 1 }).limit(10).exec(),
  ]);
  res
    .status(200)
    .json({ recentlyAdded: recentlyAddedCameras, featured: featuredCameras });
};

exports.search = async (req, res) => {
  const searchTerm = req.query.q;

  searchArray = [];
  if (typeof searchTerm === "undefined") {
    searchArray = [{ name: { $exists: true } }];
  } else {
    const searchSanitized = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
    const searchSplit = searchSanitized.split(" ");
    searchSplit.forEach((element) => {
      searchArray.push({
        name: { $regex: new RegExp(element, "i") },
      });
    });
  }

  let categoryValue;
  if (typeof req.query.category === "undefined") {
    categoryValue = { $exists: true };
  } else {
    categoryValue = req.query.category;
  }

  let brandValue;
  if (typeof req.query.brand === "undefined") {
    brandValue = { $exists: true };
  } else {
    brandValue = req.query.brand;
  }

  console.log("category value", categoryValue);
  const multipleSearch = await Camera.find(
    { category: categoryValue, brand: brandValue, $or: searchArray },
    { name: 1, category: 1, brand: 1 }
  );
  res.status(200).json(multipleSearch);
};

exports.product = async (req, res) => {
  const { id } = req.params;
  const camera = await Camera.findById(id).exec();
  if (camera === null) {
    res.status(404).json({ error: "camera not found" });
  }
  res.status(200).json({ camera: camera.name });
};
