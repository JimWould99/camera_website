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

const getMatches = async (userQuery, noMatches, budget) => {
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
        limit: noMatches,
      },
    },
  ]);
  documents = [];
  
  await result.forEach((doc) => {
    //console.log(doc.price)
    if (doc.price < budget){
      documents.push(
        JSON.stringify(
          `${doc.name}, Price: £${doc.price}, ${doc.description},  ${doc.category}, ${doc.brand}, condition: ${doc.condition}, url: http://localhost:5173/camera/${doc.cam_id}`
        )
      )
    }
    
});
  await result.forEach((doc) => console.dir(JSON.stringify(doc)));
  //console.dir(JSON.stringify(doc.name));
  await client.close();
  return documents;
};

exports.chatbot_test = async (req, res) => {
  query = req.body.message;
  //const documents = await getMatches(query);
  /*async function documents(input) {
    const result = await getMatches(input);
    return result;
  }*/

    let history = req.body.history;

    let cameraMatch
  if (!isNaN(query)){
    console.log('budget one')
     secondQuery = history[history.length-2]
     cameraMatch = await getMatches(secondQuery.content, 5, query);
  } else {
     cameraMatch = await getMatches(query, 2, 100000);
  }
//  console.log('camera match',cameraMatch)

  
  let systemPrompt = {
    role: "system",
    content: `You are a helpful assistant on a camera website called Gary. You are to use friendly and informal language. Your role is to help with cameras. Only if someone asks for a camera recomendation, follow these steps. 1. ask: 'What type of camera are you looking for (eg. a camera for the beach, landscapes or street photography)' 2. user reponse 3. ask: 'What is your budget in £? (Please only type a number)' 4. user provides budget 5. Provide recomendation. Provide the url with the recomendation, dont put the url in brackets,  put spaces either side, and dont say anything after it. Also mention the price. The currency is pounds £. The available cameras are: ${cameraMatch}`,
  };
  //console.log(systemPrompt);
  const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });
  //console.log('last', history[history.length-2] )
 // console.log("history before", history);
  const message = { role: "user", content: req.body.message };
  history.push(message);
  
  history.shift();
  history.unshift(systemPrompt);
  console.log("history after", history);
  const completion = await openai.chat.completions.create({
    messages: history,
    model: "gpt-4o-mini",
    max_tokens: 400,
  });
  const result = await completion.choices[0];
  /* [
    {
      role: "system",
      content:
        "You are a helpful assistant on a camera website called Gary. Your role is to recomend cameras",
    },
    { role: "user", content: "recomend me a camera" },
    {
    role: "assistant",
    content: "What type of camera are you looking for? eg. a camera for vacations, street photography, landscapes?",
    
  },
  ];*/
  // console.log("completion", completion.choices[0].message.content);
  res.send(completion.choices[0].message.content);
};
