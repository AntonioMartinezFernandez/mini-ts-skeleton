import { Request, Response } from 'express';

import { BaseController } from './base/base.controller';

export default class IndexController extends BaseController {
  public checkStatus = (req: Request, res: Response) => {
    try {
      res.status(200).send({ status: 'OK' });
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
