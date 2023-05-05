import { Request, Response, Router } from 'express';

import LoginServices from '../services/LoginServices';
import LoginController from '../controllers/LoginController';
import token from '../middlewares/tokens';

const LoginRouter = Router();
const loginService = new LoginServices();
const loginController = new LoginController(loginService);

LoginRouter.post('/', ((req: Request, res: Response) => loginController.login(req, res)));
LoginRouter.get('/role', token, ((req: Request, res: Response) =>
  loginController.findRole(req, res)));

export default LoginRouter;
