import { IUser } from '../../entities/user.interface';

import { Request, Response } from 'express';

import { BaseController } from './base/base.controller';

import uuid from '../../utils/uuid';
import encrypter from '../../utils/encryption';
import jwt from '../../utils/jsonwebtoken';

import userModel from '../../db/mongo/models/users.model';

export default class AuthController extends BaseController {
  public signup = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const userExist: IUser = await userModel.findOne({ email: email }).lean();

      if (!userExist) {
        const user = new userModel();
        user.id = uuid.create();
        user.email = email;
        user.password = await encrypter.encrypt(password);
        user.rol = 'user';
        const savedUser = await user.save();
        res.json({
          id: savedUser.id,
          rol: savedUser.rol,
          created_at: savedUser.created_at,
        });
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      this.handleError(error, res);
    }
  };

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const userExist: IUser = await userModel.findOne({ email: email }).lean();
      const correctPassword = await encrypter.match(
        password,
        userExist.password,
      );

      if (correctPassword) {
        const token = jwt.encrypt({
          id: userExist.id,
          rol: userExist.rol,
          email: userExist.email,
        });
        res.send({ token: token });
      } else {
        res.sendStatus(401);
      }
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
