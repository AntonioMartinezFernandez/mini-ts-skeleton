import { IRoute } from '../../entities/route.interface';

import { Router } from 'express';

import AuthController from '../controllers/auth.controller';

class AuthRoute implements IRoute {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(`${this.path}/signup`, this.authController.signup);
    this.router.post(`${this.path}/login`, this.authController.login);
  }
}

export default AuthRoute;
