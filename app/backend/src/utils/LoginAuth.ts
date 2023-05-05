import ILogin from '../interfaces/ILogin';
import ApiError from '../errors/ApiError';
import joiSchema from './schemas/Joi';

const imputValidate = (user: ILogin) => {
  const { error } = joiSchema.validate(user);

  if (error) {
    throw new ApiError('Invalid email or password', 401);
  }

  return { type: null, message: '' };
};

export default imputValidate;
