import joi = require('joi');

const joiSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

export default joiSchema;
