const express = require("express");
const Camera = require("../models/CameraModel");
const User = require("../models/UserModel");

mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// remove name limiter later

exports.user_cameras = async (req, res) => {
  // Get user id
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "need auth token" });
  }
  const token = authorization.split(" ")[1];
  const { user_id } = jwt.verify(token, process.env.WEB_TOKEN_KEY);
  const userCameras = await Camera.find({ user: user_id }).sort({
    createdAt: -1,
  });

  res.json({ userCameras: userCameras });

  // res.status(200).json({ 'test of user cameras' });
};

exports.home = async (req, res) => {
  const [recentlyAddedCameras, featuredCameras] = await Promise.all([
    Camera.find().limit(10).sort({ createdAt: -1 }).exec(),
    Camera.find({ featured: true }).limit(10).exec(),
  ]);
  res
    .status(200)
    .json({ recentlyAdded: recentlyAddedCameras, featured: featuredCameras });
};

exports.allCameras = async (req, res) => {
  const allCameras = await Camera.find().exec();
  res.status(200).json(allCameras);
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
  const multipleSearch = await Camera.find({
    category: categoryValue,
    brand: brandValue,
    $or: searchArray,
  });
  res.status(200).json(multipleSearch);
};

exports.product = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid object id" });
  }
  const camera = await Camera.findById(id).exec();
  if (camera === null) {
    res.status(404).json({ error: "camera not found" });
  }
  res.status(200).json({ camera });
};
