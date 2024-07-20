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
//const Embedding = require("../models/EmbeddingModel");

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
exports.chatbot_test = async (req, res) => {
  /*const allCameras = await Camera.find().exec();
  for (let i = 0; i <= allCameras.length - 1; i++) {
    const newEmbedding = await generateEmbedding(allCameras[i].description);
    allCameras[i].embedded_name = await newEmbedding;
    console.log("embedding", newEmbedding);
    await allCameras[i].save();
  } */
  const query = await generateEmbedding(
    "a dark camera that does not work well"
  );

  /*const output2 = await hf.featureExtraction({
    model: "sentence-transformers/all-MiniLM-L6-v2",
    inputs: "cat",
  });*/

  // const similarity = dotProduct(query, output2);

  //console.log(query);
  await client.connect();
  const db = client.db("camera_site");
  const coll = db.collection("products");
  const result = coll.aggregate([
    {
      $vectorSearch: {
        index: "search_vector2",
        path: "embedded_name",
        queryVector: query,
        numCandidates: 150,
        limit: 5,
      },
    },
  ]);
  //console.log(result);
  documents = [];
  await result.forEach((doc) =>
    documents.push(
      JSON.stringify(`${doc.name}, ${doc.description}, ${doc.price}`)
    )
  );
  // console.dir(JSON.stringify(doc.name)));
  console.log(documents);
  await client.close();
  res.json({ mssg: result });

  // res.json({ mssg: query });
};
