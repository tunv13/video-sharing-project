const db = require("../models");
const User = db.User;

const userService = {
  async findOneByEmail(email) {
    if (!email) {
      return false;
    }

    const user = await User.findOne({ where: { email } });
    if (user === null) {
      return false;
    }
    return user;
  },
};
module.exports = userService;
