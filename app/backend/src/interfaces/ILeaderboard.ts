export default interface ILeaderboard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalDraws: number;
  totalVictories: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

export interface teamStats {
  teamId: number;
  goalsScored: number;
  opponentGoals: number;
  teamName: string;
  allTeams: Record<number, ILeaderboard>;
}

export interface IHome {
  id: number,
  homeTeamId: number;
  homeTeamGoals: number;
  inProgress: boolean;
  homeTeam: {
    dataValues: { teamName: string },
  };
}

export interface IAway {
  id: number,
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
  awayTeam: {
    dataValues: { teamName: string },
  };
}
