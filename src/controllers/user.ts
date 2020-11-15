import * as express from 'express';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Users } from '../entity/user';

export default class UserController {
  public router = express.Router();

  public constructor() {
    this.router.get('/', this.index);
    this.router.post('/', this.store);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.destroy);
  }

  private index = async (req: Request, res: Response) => {
    const userModel = getRepository(Users);
    res.json(await userModel.find());
  };

  private store = async (req: Request, res: Response) => {
    const userModel = getRepository(Users);
    const user = await userModel.create(req.body);
    const result = await userModel.save(user);

    res.json(result);
  };

  private update = async (req: Request, res: Response) => {
    const userModel = getRepository(Users);
    const user = await userModel.findOne(req.params.id);
    const result = await userModel.merge(user, req.body);

    res.json(result);
  };

  private destroy = async (req: Request, res: Response) => {
    const userModel = getRepository(Users);
    const response = await userModel.delete(req.params.id);

    res.json(response);
  };
}
