import Match from '../database/models/MatchModel';

interface IMatches {
  status: number;
  message: unknown;
}

export interface IMatch {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface ITeamMatches extends Match {
  teamName: string;
  mainTeamGoals: number[];
  oppTeamsGoals: number[];
}

export default IMatches;
