"use strict";
const db = require(".");
const User = db.User;
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Video.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT('long'),
      videoKey: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Video",
    }
  );

  return Video;
};
