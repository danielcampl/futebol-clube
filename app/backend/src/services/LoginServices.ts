import * as bcrypt from 'bcryptjs';
import * as Jwt from 'jsonwebtoken';
import { ModelStatic } from 'sequelize';

import ApiError from '../errors/ApiError';
import User from '../database/models/UserModel';
import IUser from '../interfaces/IUser';

const jwtSecret = process.env.JWT_SECRET as string;

// get email / and verify all login requisitions / passed on test
export default class LoginServices implements IUser {
  protected model: ModelStatic<User> = User;
  private jwt = Jwt;

  async findByEmail(email: string, password: string): Promise<string> {
    const emailVerify = await this.model.findOne({ where: { email } });

    if (!emailVerify) {
      throw new ApiError('Invalid email or password', 401);
    }

    const passwordVerify = bcrypt.compareSync(password, emailVerify.password);

    if (!passwordVerify) {
      throw new ApiError('Invalid email or password', 401);
    }

    // No token created yet
    const token = this.jwt.sign({ data: { email, role: emailVerify.role } }, jwtSecret);

    return token;
  }

  findByRole(authorization: string): string {
    try {
      const { data: { role } } = this.jwt.verify(authorization, jwtSecret) as Jwt.JwtPayload;

      return role;
    } catch (error) {
      throw new ApiError('invalid', 401);
    }
  }
}

// .
