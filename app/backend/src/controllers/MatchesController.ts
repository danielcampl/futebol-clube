import { Request, Response } from 'express';

import MatchServices from '../services/MatchServices';
import TeamServices from '../services/TeamServices';

export default class MatchesController {
  constructor(
    private _service = new MatchServices(),
    public _teamService = new TeamServices(),
  ) {}

  async findMatch(req: Request, res: Response) {
    const { inProgress } = req.query;
    const matches = await this._service.findAll(inProgress as string);

    return res.status(matches.status).json(matches.message);
  }

  // REQ 17 --- 19
  public async finishedMatch(req: Request, res: Response) {
    const { id } = req.params;
    await this._service.finish(Number(id));

    return res.status(200).json({ message: 'Finished' });
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this._service.update(id, homeTeamGoals, awayTeamGoals);

    return res.status(200).json({ message: 'update success' });
  }

  public async createMatch(req: Request, res: Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const result = await this._service.createMatch(
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    );
    res.status(201).json(result);
  }
}
