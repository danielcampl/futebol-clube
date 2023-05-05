import ILeaderboard from '../interfaces/ILeaderboard';
import { IMatch } from '../interfaces/IMatches';

let teams = {
  name: '',
  // PTS
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  // GOALS
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,

  efficiency: 0,
};

const teamInitialValues = () => {
  teams.totalPoints = 0;
  teams.totalGames = 0;
  teams.totalVictories = 0;
  teams.totalDraws = 0;
  teams.totalLosses = 0;
  teams.goalsFavor = 0;
  teams.goalsOwn = 0;
  teams.goalsBalance = 0;
  teams.efficiency = 0;
};

// HOME TEAMS FUNCTIONS
const homeTeamWin = (homeTeamGoals: number, awayTeamGoals: number) => {
  teams.totalPoints += 3;
  teams.totalVictories += 1;
  teams.goalsFavor += homeTeamGoals;
  teams.goalsOwn += awayTeamGoals;
};

const homeTeamDraw = (homeTeamGoals: number, awayTeamGoals: number) => {
  teams.totalPoints += 1;
  teams.totalDraws += 1;
  teams.goalsFavor += homeTeamGoals;
  teams.goalsOwn += awayTeamGoals;
};

const homeTeamLosses = (homeTeamGoals: number, awayTeamGoals: number) => {
  teams.totalLosses += 1;
  teams.goalsFavor += homeTeamGoals;
  teams.goalsOwn += awayTeamGoals;
};

const insertHomeScore = ((matches: IMatch[]) => {
  matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals > awayTeamGoals) homeTeamWin(homeTeamGoals, awayTeamGoals);
    if (homeTeamGoals === awayTeamGoals) homeTeamDraw(homeTeamGoals, awayTeamGoals);
    if (homeTeamGoals < awayTeamGoals) homeTeamLosses(homeTeamGoals, awayTeamGoals);
  });
});

// AWAY TEAMS FUNCTIONS
const awayTeamWin = (homeTeamGoals: number, awayTeamGoals: number) => {
  teams.totalPoints += 3;
  teams.totalVictories += 1;
  teams.goalsFavor += awayTeamGoals;
  teams.goalsOwn += homeTeamGoals;
};

const awayTeamDraw = (homeTeamGoals: number, awayTeamGoals: number) => {
  teams.totalPoints += 1;
  teams.totalDraws += 1;
  teams.goalsFavor += awayTeamGoals;
  teams.goalsOwn += homeTeamGoals;
};

const awayTeamLosses = (homeTeamGoals: number, awayTeamGoals: number) => {
  teams.totalLosses += 1;
  teams.goalsFavor += awayTeamGoals;
  teams.goalsOwn += homeTeamGoals;
};

const insertAwayScore = ((matches: IMatch[]) => {
  matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals < awayTeamGoals) awayTeamWin(homeTeamGoals, awayTeamGoals);
    if (homeTeamGoals === awayTeamGoals) awayTeamDraw(homeTeamGoals, awayTeamGoals);
    if (homeTeamGoals > awayTeamGoals) awayTeamLosses(homeTeamGoals, awayTeamGoals);
  });
});

const insertAllScores = (awayTeams: ILeaderboard[], index: number) => {
  teams.totalPoints += awayTeams[index].totalPoints;
  teams.totalGames += awayTeams[index].totalGames;
  teams.totalDraws += awayTeams[index].totalDraws;
  teams.totalVictories += awayTeams[index].totalVictories;
  teams.totalLosses += awayTeams[index].totalLosses;
  teams.goalsFavor += awayTeams[index].goalsFavor;
  teams.goalsOwn += awayTeams[index].goalsOwn;
  teams.totalGames += 1;
};

// ALL EXPORTED FUNCTIONS FOR SERVICES
export const sortPosition = (allTeamsOrganized: ILeaderboard[]) =>
  allTeamsOrganized.sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }

    if (b.totalVictories !== a.totalVictories) {
      return b.totalVictories - a.totalVictories;
    }

    if (b.goalsBalance !== a.goalsBalance) {
      return b.goalsBalance - a.goalsBalance;
    }

    if (b.goalsFavor !== a.goalsFavor) {
      return b.goalsFavor - a.goalsFavor;
    }

    return b.goalsOwn - a.goalsFavor;
  });

export function sortTeams(homeTeam: ILeaderboard, awayTeams: ILeaderboard[]) {
  teams = homeTeam;

  const foundTeam = awayTeams.find(
    (awayTeam: ILeaderboard) => awayTeam.name === homeTeam.name,
  );

  if (foundTeam !== undefined) {
    const index: number = awayTeams.findIndex((indexTeam) => indexTeam.name === foundTeam.name);
    insertAllScores(awayTeams, index);
  }

  teams.totalGames -= 1;
  teams.goalsBalance = teams.goalsFavor - teams.goalsOwn;
  teams.efficiency = Number(
    ((teams.totalPoints / (teams.totalGames * 3)) * 100).toFixed(2),
  );

  return teams;
}

export function sortHomeTeams(name: string, matches: IMatch[]) {
  if (name !== teams.name) teamInitialValues();

  teams.name = name;
  insertHomeScore(matches);
  teams.totalGames += 1;
  teams.goalsBalance = teams.goalsFavor - teams.goalsOwn;
  teams.efficiency = Number(
    ((teams.totalPoints / (teams.totalGames * 3)) * 100).toFixed(2),
  );

  return teams;
}

export function sortAwayTeams(name: string, matches: IMatch[]) {
  if (name !== teams.name) teamInitialValues();

  teams.name = name;
  insertAwayScore(matches);
  teams.totalGames += 1;
  teams.goalsBalance = teams.goalsFavor - teams.goalsOwn;
  teams.efficiency = Number(
    ((teams.totalPoints / (teams.totalGames * 3)) * 100).toFixed(2),
  );

  return teams;
}
