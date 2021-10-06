const express = require("express");
const userController = require("../controllers/users");

const route = express.Router();

route.get("/", userController.Fetch);

module.exports = route;