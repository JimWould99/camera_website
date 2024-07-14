const express = require("express");
const User = require("../models/UserModel");
const { JsonWebTokenError } = require("jsonwebtoken");
mongoose = require("mongoose");
require("dotenv").config();

const createToken = (user_id) => {
  return jwt.sign({ user_id }, process.WEB_TOKEN_KEY, { expiresIN: "1d" });
};

exports.login = async (req, res) => {
  res.json({ mssg: "login user" });
};

exports.signupUser = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const user = await User.signup(email, username, password);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
