const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

/*app.use(
  cors({
    origin: "*",
  })
);*/

const app = express();

//app.use(express.static("dist"));

app.use(express.json());

//app.use(cors());

//app.use(setCorsHeaders);
app.use(
  cors({
    origin: "https://camera-website-frontend.onrender.com",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const indexRouter = require("./routes/index");
const productRouter = require("./routes/product");
const userRouter = require("./routes/users");

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

app.use("/api/users", userRouter);

/*
app.get("/api/product", (req, res) => {
  res.json({ mssg: "app testing" });
});*/
