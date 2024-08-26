const express = require("express");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcrypt");
const validator = require("validator");

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

exports.deleteUser = async (req, res) => {
  //res.json({ mssg: "Not yet implemented delete user" });

  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "need auth token" });
  }
  const token = authorization.split(" ")[1];
  const { user_id } = jwt.verify(token, process.env.WEB_TOKEN_KEY);
  const currentUser = User.findById(user_id);
  if (req.password === currentUser.password) {
    await User.findByIdAndDelete(user_id);
    return res.status(200).json({ msg: "all fine" });
  } else {
    // throw Error("Incorrect password");
    return res.status(401).json({ error: "wrong password" });
  }
};

exports.changePassword = async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "need auth token" });
  }
  const token = authorization.split(" ")[1];
  const { user_id } = await jwt.verify(token, process.env.WEB_TOKEN_KEY);
  const currentUser = await User.findById(user_id);
  let currentName = currentUser.name;
  let currentId = currentUser._id;
  let currentEmail = currentUser.email;

  const match = await bcrypt.compare(
    req.body.oldPassword,
    currentUser.password
  );
  if (!match) {
    return res.status(401).json({ error: "incorrect password" });
  }
  try {
    const changedUser = await User.changePassword(
      currentEmail,
      currentName,
      req.body.password,
      currentId
    );
    res.status(200).json({ msg: "successfully deleted", changedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
