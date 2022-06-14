import { IUser } from '../../entities/user.interface';

import { Request, Response } from 'express';

import { BaseController } from './base/base.controller';

import uuid from '../../utils/uuid';
import encrypter from '../../utils/encryption';

import userModel from '../../db/mongo/models/users.model';

export default class UserController extends BaseController {
  public all = async (req: Request, res: Response) => {
    try {
      const users = await userModel.find().lean();
      res.json({ users: users });
    } catch (error) {
      this.handleError(error, res);
    }
  };

  public find = async (req: Request, res: Response) => {
    try {
      const user: IUser = await userModel.findOne({ id: req.params.id }).lean();
      res.json({ user });
    } catch (error) {
      this.handleError(error, res);
    }
  };

  public store = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
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
    } catch (error) {
      this.handleError(error, res);
    }
  };

  public modify = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const id = req.params.id;

    try {
      const userExist: IUser = await userModel.findOne({ email: email }).lean();
      let user;

      if (!userExist) {
        user = await userModel.findOne({ id: id }).exec();
      }

      if (!userExist && user) {
        if (email) {
          user.email = email;
        }
        if (password) {
          user.password = await encrypter.encrypt(password);
        }

        const savedUser = await user.save();
        res.json({
          email: savedUser.email,
          created_at: savedUser.created_at,
        });
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      this.handleError(error, res);
    }
  };

  public remove = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
      const deletedUser = await userModel.remove({ id: id }).exec();
      res.json({ deletedUser: deletedUser });
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
