const express = require("express");
const router = express.Router();
const { rateLimit } = require("express-rate-limit");

const product_display_controller = require("../controllers/product_display_controller");
const product_delete_controller = require("../controllers/product_delete_controller");
const product_add_controller = require("../controllers/product_add_controller");
const chatbot_controller = require("../controllers/chatbot_controller");
const chatbot_main_controller = require("../controllers/chatbot_main_controller");

const limiter = rateLimit({
  windowMs: 1440 * 60 * 1000,
  limit: 15,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

// general and display/read //

// specific users cameras

router.get("/user_cameras", product_display_controller.user_cameras);

//chatbot

router.post("/chatbot", limiter, chatbot_controller.chatbot);

//home page
router.get("/", product_display_controller.home);

// all cameras
router.get("/allCameras", product_display_controller.allCameras);

// search result
router.get("/search", product_display_controller.search);

//specific product page
router.get("/:id", product_display_controller.product);

// create and update new product listing //

router.get("/create", product_add_controller.create_product_get);

router.post("/create", product_add_controller.create_product_post);

router.get("/update", product_add_controller.update_product_get);

router.post("/update", product_add_controller.update_product_post);

// delete product listing

router.get("/delete", product_delete_controller.delete_product_get);

router.post("/delete", product_delete_controller.delete_product_post);

//chatbot test

router.post("/chatbot_test", chatbot_main_controller.chatbot_main);

//

module.exports = router;
