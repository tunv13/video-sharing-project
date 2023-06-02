const { Sequelize, DataTypes } = require('sequelize');
const db = require("../models");
const User = require('./user.dto')
const VideoDto = db.sequelize.define('Video', {
  // Model attributes are defined here
  title: DataTypes.STRING,
  description: DataTypes.TEXT('long'),
  videoKey: DataTypes.STRING,
  
}, {
  // Other model options go here
});
VideoDto.belongsTo(User)
module.exports = VideoDto