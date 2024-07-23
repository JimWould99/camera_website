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

const { ChatOpenAI } = require("@langchain/openai");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const {
  HumanMessage,
  BaseMessage,
  AIMessage,
} = require("@langchain/core/messages");

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
        limit: 3,
      },
    },
  ]);
  documents = [];
  await result.forEach((doc) =>
    documents.push(
      JSON.stringify(
        `${doc.name}, ${doc.price}, ${doc.description},  ${doc.category}, ${doc.brand}, ${doc.condition}, id: ${doc._id}`
      )
    )
  );
  await result.forEach((doc) => console.dir(JSON.stringify(doc)));
  //console.dir(JSON.stringify(doc.name));
  await client.close();
  return documents;
};

exports.chatbot_test = async (req, res) => {
  query = req.body.question;
  const documents = async (query) => await getMatches(query);
  console.log(await documents(query));

  const model = new ChatOpenAI({
    apiKey: process.env.OPEN_AI_KEY,
    model: "gpt-4o-mini",
    temperature: 0,
    maxTokens: 80,
  });

  const standaloneQueryTemplate =
    "Given a camera query, convert it to a standalone camera query. query: {query} standalone query:";

  const standaloneQueryPrompt = ChatPromptTemplate.fromTemplate(
    standaloneQueryTemplate
  );

  const chain = standaloneQueryPrompt.pipe(model).pipe(documents);

  const response = await chain.invoke({
    query: "I want a camera. I want to find it now",
  });

  res.json({ mssg: response.content });
};
