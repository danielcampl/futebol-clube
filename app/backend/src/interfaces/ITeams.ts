export interface ITeam {
  id?: number;
  teamName: string;
}

export default interface ITeamService {
  findAll(): Promise<ITeam[]>;
}
