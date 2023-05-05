import { ModelStatic } from 'sequelize';

import IMatches from '../interfaces/IMatches';
import MatchModel from '../database/models/MatchModel';
import TeamsModel from '../database/models/TeamsModel';

export default class MatchServices {
  // REQ 15
  private _model: ModelStatic<MatchModel> = MatchModel;

  public async findAll(inProgress: string): Promise<IMatches> {
    const matches = await this._model.findAll({
      include: [
        { model: TeamsModel, as: 'homeTeam' },
        { model: TeamsModel, as: 'awayTeam' },
      ],
    });

    // REQ 16
    if (inProgress === 'true') {
      return { status: 200, message: matches.filter((match) => match.inProgress) };
    }

    if (inProgress === 'false') {
      return { status: 200, message: matches.filter((match) => !match.inProgress) };
    }

    return { status: 200, message: matches };
  }

  // STARTING REQS 17 --- 19
  public async finish(id: number): Promise<void> {
    await this._model.update({ inProgress: false }, { where: { id } });
  }

  public async update(id: string, homeTeamGoals: number, awayTeamGoals: number) {
    await this._model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  public async createMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<MatchModel | undefined> {
    return this._model.create(
      { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress: true },
    );
  }
}
