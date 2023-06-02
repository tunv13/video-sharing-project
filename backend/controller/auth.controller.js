const bcrypt = require("bcrypt");
const authService = require("../services/auth.service");
const userService = require("../services/user.service");
const helper = require("../helper");
exports.login = async (req, res) => {
  const body = req.body;
  const errorList = [];
  if (!body.email) {
    errorList.push("email");
  }
  if (!body.password) {
    errorList.push("password");
  }

  if (errorList.length > 0) {
    const message = "require " + errorList.join(", ");
    return helper.error400(res, message);
  }

  const response = await authService.login(body.email, body.password);
  if (!response.accessToken) {
    return res.status(400).json({
      status: 400,
      content: "Wrong email or password",
    });
  }

  res.status(200).json(response);
};
exports.register = async (req, res) => {
  try {
    // Validate request

    const body = req.body;
    const errorList = [];
    if (!body.email) {
      errorList.push("email");
    }
    if (!body.password) {
      errorList.push("password");
    }
    if (!body.firstName) {
      errorList.push("firstName");
    }
    if (!body.lastName) {
      errorList.push("lastName");
    }
    if (errorList.length > 0) {
      const message = "require " + errorList.join(", ");
      return helper.error400(res, message);
    }
    const userExist = await userService.findOneByEmail(body.email);
    if (userExist.id) {
      const message = "Duplicate email";
      return helper.error400(res, message);
    }

    const salt = bcrypt.genSaltSync(10);
    const user = {
      email: body.email,
      password: bcrypt.hashSync(body.password, salt),
      firstName: body.firstName,
      lastName: body.lastName,
    };

    const result = await authService.register(user);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      status: 500,
      content: JSON.stringify(error),
    });
  }
};
