const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
require("dotenv").config();

const indexRouter = require("./routes/index");
const productRouter = require("./routes/product");

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    app.listen(process.env.PORT, () => {
      console.log("listening on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/", indexRouter);
app.use("/api/product", productRouter);

/*
app.get("/api/product", (req, res) => {
  res.json({ mssg: "app testing" });
});*/
