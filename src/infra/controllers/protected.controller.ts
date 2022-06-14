import { Request, Response } from 'express';

import { BaseController } from './base/base.controller';

export default class ProtectedController extends BaseController {
  public protectedInfo = (req: Request, res: Response) => {
    try {
      res.status(200).send({
        user_data: req.body.user.data,
      });
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
