const Joi = require("joi");

const checkRegisterData = (req, res, next) => {
  const { error } = Joi.object({
    firstname: Joi.string().min(2).max(50).presence("required"),
    lastname: Joi.string().min(2).max(250).presence("required"),
    email: Joi.string().email().presence("required"),
    password: Joi.string().min(6).max(20).presence("required"),
    phoneNumber: Joi.string().min(10).max(10).presence("required"),
    address: Joi.string().min(2).max(250).presence("required"),
    gender: Joi.string().valid("M", "F", "O").presence("required"),
  }).validate(req.body, { abortEarly: false });

  if (!error) {
    next();
  } else {
    res.status(400).json(error);
  }
};

const checkLoginData = (req, res, next) => {
  const { error } = Joi.object({
    email: Joi.string().email().presence("required"),
    password: Joi.string().presence("required"),
  }).validate(req.body, { abortEarly: false });

  if (!error) {
    next();
  } else {
    console.error("Validation error :", error);
    res.status(400).json(error);
  }
};

module.exports = {
  checkRegisterData,
  checkLoginData,
};
