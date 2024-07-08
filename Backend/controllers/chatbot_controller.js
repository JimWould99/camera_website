const express = require("express");
require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

exports.chatbot = async (req, res) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  chat = model.startChat({
    history: req.body.history,
  });

  const msg = req.body.message;
  const result = await chat.sendMessage(msg);
  const response = await result.response.text();
  res.send(response);
};
