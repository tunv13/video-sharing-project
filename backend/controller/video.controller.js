const UserDto = require("../dtos/user.dto");
const VideoDto = require("../dtos/video.dto");
const videoService = require("../services/video.service");
function videoController(io) {
  const create = async (req, res) => {
    try {
      const body = req.body;
      const errorList = [];
      if (!body.title) {
        errorList.push("title");
      }
      if (!body.description) {
        errorList.push("description");
      }
      if (!body.videoKey) {
        errorList.push("videoKey");
      }
      if (!req.user.id) {
        errorList.push("user id");
      }

      if (errorList.length > 0) {
        const message = "require " + errorList.join(", ");
        return helper.error400(res, message);
      }

      const result = await videoService.create({
        ...body,
        userId: req.user.id,
      });
      io.emit("newPost", {
        title: result.title,
        user: req.user.email,
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        status: 500,
        content: JSON.stringify(error),
      });
    }
  };
  const getVideos = async (req, res) => {
    try {
      const result = await videoService.findAll(req.query);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        status: 500,
        content: JSON.stringify(error),
      });
    }
  };

  return { getVideos, create };
}

module.exports = videoController;
