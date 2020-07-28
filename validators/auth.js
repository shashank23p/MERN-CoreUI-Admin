const Joi = require("@hapi/joi");

const registerValidator = (data) => {
  const Schema = Joi.object({
    name: Joi.string().max(255).required(),
    email: Joi.string().min(4).required().email(),
    password: Joi.string().min(6).required(),
  });
  return Schema.validate(data);
};

const loginValidator = (data) => {
  const Schema = Joi.object({
    email: Joi.string().min(4).required().email(),
    password: Joi.string().min(6).required(),
  });
  return Schema.validate(data);
};
module.exports.registerValidator = registerValidator;
module.exports.loginValidator = loginValidator;
