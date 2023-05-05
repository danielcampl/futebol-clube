import { Request, Response } from 'express';
import LoginServices from '../services/LoginServices';
import imputValidate from '../utils/LoginAuth';

export default class LoginController {
  private _service: LoginServices;

  constructor(service: LoginServices) {
    this._service = service;
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    imputValidate({ email, password });
    const token = await this._service.findByEmail(email, password);
    return res.status(200).json({ token });
  }

  findRole(req: Request, res: Response) {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const result = this._service.findByRole(authorization);

    return res.status(200).json({ role: result });
  }
}
