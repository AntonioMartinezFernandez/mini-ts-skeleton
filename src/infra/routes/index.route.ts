import { IRoute } from '../../entities/route.interface';

import { Router } from 'express';

import IndexController from '../controllers/index.controller';

class IndexRoute implements IRoute {
  public path = '/';
  public router = Router();
  public indexController = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(`${this.path}`, this.indexController.checkStatus);
  }
}

export default IndexRoute;
