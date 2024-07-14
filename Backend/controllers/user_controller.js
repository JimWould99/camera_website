const express = require("express");
//const User = require("../models/UserModel");
mongoose = require("mongoose");

exports.login = async (req, res) => {
  res.json({ mssg: "login user" });
};

exports.signupUser = async (req, res) => {
  res.json({ mssg: "sign up user" });
};
