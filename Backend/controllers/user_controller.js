const express = require("express");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
mongoose = require("mongoose");
require("dotenv").config();

const createToken = (user_id) => {
  return jwt.sign({ user_id }, process.env.WEB_TOKEN_KEY, { expiresIn: "1d" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    let name = user.name;

    const token = createToken(user._id);

    res.status(200).json({ email, name, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.signupUser = async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const user = await User.signup(email, name, password);

    const token = createToken(user._id);
    res.status(200).json({ email, name, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
