const express = require("express");
const bugController = require("../controllers/bug");
const authController = require("../controllers/auth");

const route = express.Router();

route.put("/add", authController.ValidateToken, bugController.Create);
route.put("/update", authController.ValidateToken, bugController.Update);
route.get("/", authController.ValidateToken, bugController.Fetch);

module.exports = route;