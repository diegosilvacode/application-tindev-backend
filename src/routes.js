const express = require("express");
const DeveloperController = require("./controllers/DeveloperController");
const LikeController = require("./controllers/LikeController");
const DislikeController = require("./controllers/DislikeController");

const routes = express.Router();

routes.get("/developers", DeveloperController.index);
routes.post("/developers", DeveloperController.store);

routes.post("/developers/:developerID/likes", LikeController.store);
routes.post("/developers/:developerID/dislikes", DislikeController.store);

module.exports = routes;
