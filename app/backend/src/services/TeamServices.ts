import { ModelStatic } from 'sequelize';
import ITeamService, { ITeam } from '../interfaces/ITeams';
import Team from '../database/models/TeamsModel';

class TeamServices implements ITeamService {
  private model: ModelStatic<Team> = Team;

  public async findAll(): Promise<ITeam[]> {
    const teams = await this.model.findAll();

    return teams;
  }

  async findOne(id:number): Promise<Team> {
    const result = await this.model.findOne({ where: { id } });

    if (!result) throw new Error('NOT_FOUND');

    return result;
  }
}

export default TeamServices;
