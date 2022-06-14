import { IRoute } from '../../entities/route.interface';

import { Router } from 'express';

import UserController from '../controllers/user.controller';

class UserRoute implements IRoute {
  public path = '/user';
  public router = Router();
  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(`${this.path}/all`, this.userController.all);
    this.router.get(`${this.path}/find/:id`, this.userController.find);
    this.router.post(`${this.path}/save`, this.userController.store);
    this.router.put(`${this.path}/edit/:id`, this.userController.modify);
    this.router.delete(`${this.path}/delete/:id`, this.userController.remove);
  }
}

export default UserRoute;
