const { Sequelize, DataTypes } = require('sequelize');
const db = require("../models");
const UserDto = db.sequelize.define('User', {
  // Model attributes are defined here
  email: {
    type: DataTypes.STRING,
  },
  
}, {
  // Other model options go here
});

module.exports = UserDto