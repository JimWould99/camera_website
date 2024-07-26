const express = require("express");
require("dotenv").config();
const { MongoClient } = require("mongodb");
/*import { pipeline } from "@xenova/transformers";
const pipeline = require("@xenova/transformers");*/
const { HfInference } = require("@huggingface/inference");
const hf = new HfInference(process.env.TEST_KEY);
const client = new MongoClient(process.env.MONGO_URI);
TransformersApi = Function('return import("@xenova/transformers")')();
const Camera = require("../models/CameraModel");
const EmbeddingModel = require("../models/EmbeddingModel");
const Embedding = require("../models/EmbeddingModel");
const { OpenAI } = require("openai");

function dotProduct(a, b) {
  if (a.length !== b.length) {
    throw new Error("Both arguments must have the same length");
  }
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result += a[i] * b[i];
  }
  return result;
}
const generateEmbedding = async (textToConvert) => {
  const output = await hf.featureExtraction({
    model: "sentence-transformers/all-MiniLM-L6-v2",
    inputs: textToConvert,
  });
  return output;
};
const getMatches = async (userQuery) => {
  let query = await generateEmbedding(userQuery);
  await client.connect();
  const db = client.db("camera_site");
  const coll = db.collection("embeddings");
  const result = coll.aggregate([
    {
      $vectorSearch: {
        index: "search",
        path: "embeddings",
        queryVector: query,
        numCandidates: 150,
        limit: 2,
      },
    },
  ]);
  documents = [];
  await result.forEach((doc) =>
    documents.push(
      JSON.stringify(
        `${doc.name}, Price: £${doc.price}, ${doc.description},  ${doc.category}, ${doc.brand}, condition: ${doc.condition}, url: http://127.0.0.1:5173/camera/${doc._id}`
      )
    )
  );
  await result.forEach((doc) => console.dir(JSON.stringify(doc)));
  //console.dir(JSON.stringify(doc.name));
  await client.close();
  return documents;
};

exports.populate_database = async (req, res) => {
  const allCameras = await Camera.find().exec();
  for (let i = 0; i <= allCameras.length - 1; i++) {
    let testString =
      allCameras[i].name +
      allCameras[i].description +
      allCameras[i].brand +
      allCameras[i].category +
      allCameras[i].model;
    const newEmbedding = await generateEmbedding(testString);
    // console.log(testString);
    const embedded_camera = await Embedding.create({
      embeddings: newEmbedding,
      name: allCameras[i].name,
      description: allCameras[i].description,
      brand: allCameras[i].brand,
      category: allCameras[i].category,
      model: allCameras[i].model,
      condition: allCameras[i].condition,
      price: allCameras[i].price,
      max_res: allCameras[i].max_res,
      image: allCameras[i].image,
    });
  }
};

exports.chatbot_test = async (req, res) => {
  query = req.body.message;
  //const documents = await getMatches(query);
  /*async function documents(input) {
    const result = await getMatches(input);
    return result;
  }*/

  const cameraMatch = await getMatches(query);

  let systemPrompt = {
    role: "system",
    content: `You are a helpful assistant on a camera website called Gary. You are to use friendly and informal language. Your role is to recomend cameras. If someone asks for a camera recomendation, ask them what type of camera they are looking for before giving a recomendation. Provide the url with the recomendation, put the url on its own line. The available cameras are: ${cameraMatch}`,
  };

  //console.log(systemPrompt);

  const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });

  let history = req.body.history;

  console.log("history before", history);

  const message = { role: "user", content: req.body.message };

  history.push(message);

  history.shift();
  history.unshift(systemPrompt);
  console.log("history after", history);

  const completion = await openai.chat.completions.create({
    messages: history,
    model: "gpt-4o-mini",
    max_tokens: 150,
  });

  const result = await completion.choices[0];

  /* [
    {
      role: "system",
      content:
        "You are a helpful assistant on a camera website called Gary. Your role is to recomend cameras",
    },
    { role: "user", content: "Hello" },
    {
    role: "assistant",
    content: "The Los Angeles Dodgers won the World Series in 2020.",
  },
  ];*/

  // console.log("completion", completion.choices[0].message.content);

  res.send(completion.choices[0].message.content);
};
