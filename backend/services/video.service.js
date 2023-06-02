const UserDto = require("../dtos/user.dto");
const VideoDto = require("../dtos/video.dto");
const { getPagination, getPagingData } = require("../helper");
const db = require("../models");
const Video = db.Video;
const Op = db.Sequelize.Op;
const videoService = {
  async findAll(query) {
    try {
      const { page, size, title } = query;
      const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
      const { limit, offset } = getPagination(page, size);
      const data = await VideoDto.findAndCountAll({
        include: UserDto,
        where: condition,
        limit,
        offset,
      });
      
      return getPagingData(data, page, limit);
    } catch (error) {
      console.log('er',error)
      return Promise.reject(error);
    }
  },
  create(data) {
    try {
      return Video.create(data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
module.exports = videoService;
