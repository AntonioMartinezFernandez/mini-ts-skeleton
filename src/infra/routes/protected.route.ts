import { IRoute } from '../../entities/route.interface';

import { Router } from 'express';

import ProtectedController from '../controllers/protected.controller';

import { authMiddleware } from '../middleware/auth.middleware';

class ProtectedRoute implements IRoute {
  public path = '/protected';
  public router = Router();
  public protectedController = new ProtectedController();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(
      `${this.path}/`,
      authMiddleware,
      this.protectedController.protectedInfo,
    );
  }
}

export default ProtectedRoute;
