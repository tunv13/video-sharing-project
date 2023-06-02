function videoRouter(io) {
  const express = require("express");
  const router = express.Router();
  const { isAuthenticated } = require("../middleware/isAuthenticate");
  const videoController = require("../controller/video.controller")(io);
  router.get("/", videoController.getVideos);
  router.post("/",isAuthenticated, videoController.create);
  return router;
}

module.exports = videoRouter;
