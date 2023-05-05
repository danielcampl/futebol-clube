import { Request, Response } from 'express';
import TeamServices from '../services/TeamServices';

export default class TeamsController {
  constructor(private teamServices = new TeamServices()) {}

  async findAll(_req: Request, res: Response): Promise<Response> {
    const result = await this.teamServices.findAll();

    return res.status(200).json(result);
  }

  async findOne(req: Request, res: Response):Promise<Response> {
    const { id } = req.params;
    const result = await this.teamServices.findOne(Number(id));

    return res.status(200).json(result);
  }
}
