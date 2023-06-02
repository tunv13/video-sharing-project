const db = require("../models");
const userService = require("./user.service");
const User = db.User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authService = {
  register(user) {
    return User.create(user);
  },
  async login(email, password) {
    try {
      const user = await userService.findOneByEmail(email);

      if (!user) return false;
      const isSuccessPassword = bcrypt.compare(password, user.password);
      if (!isSuccessPassword) return false;
      const accessToken = jwt.sign(
        { email: user.email, id: user.id },
        process.env.SECRET_KEY
      );
      return { accessToken, email: user.email };
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = authService;
