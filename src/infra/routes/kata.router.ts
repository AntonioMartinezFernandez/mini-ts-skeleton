import { Router } from 'express';

import { KataController } from '../controllers/kata.controller';

export class KataRoute {
  router = Router();
  kataController = new KataController();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get('/', this.kataController.get);
    this.router.post('/', this.kataController.post);
  }
}
