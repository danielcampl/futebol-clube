import { ModelStatic } from 'sequelize';

import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamsModel';
import {
  sortAwayTeams,
  sortHomeTeams,
  sortPosition,
  sortTeams } from '../utils/LeaderboardSorter';

export default class LeaderboardServices {
  static readonly matchModel: ModelStatic<Match> = Match;

  // home teams
  static async getHomeTeams() {
    const allTeams = await Promise.all(await Team.findAll());
    const homeTeams = allTeams.map(async (homeTeam) => {
      const homeMatches = await LeaderboardServices.matchModel.findAll(
        { where: { homeTeamId: homeTeam.id, inProgress: false } },
      );

      const statisticsHome = homeMatches.map((match) => (
        sortHomeTeams(homeTeam.teamName, [match])
      ));

      const statisticsTeams = statisticsHome[homeMatches.length - 1];

      return { ...statisticsTeams };
    });

    return homeTeams;
  }

  // other teams
  static async getAwayTeams() {
    const allTeams = await Promise.all(await Team.findAll());
    const awayTeams = allTeams.map(async (awayTeam) => {
      const awayMatches = await LeaderboardServices.matchModel.findAll(
        { where: { awayTeamId: awayTeam.id, inProgress: false } },
      );

      const statisticsAway = awayMatches.map((match) => (
        sortAwayTeams(awayTeam.teamName, [match])
      ));

      const statisticsTeams = statisticsAway[awayMatches.length - 1];

      return { ...statisticsTeams };
    });

    return awayTeams;
  }

  // all teams
  static async getAllTeams() {
    const homeTeams = await Promise.all(await this.getHomeTeams());
    const awayTeams = await Promise.all(await this.getAwayTeams());

    return homeTeams.map((homeTeam) => sortTeams(homeTeam, awayTeams));
  }

  // extended functions for controller
  leaderboardTotal = async () => {
    const results = await LeaderboardServices.getAllTeams();

    return sortPosition(results);
  };

  leaderboardHome = async () => {
    const homeTeams = await LeaderboardServices.getHomeTeams();
    const results = await Promise.all(homeTeams);
    const classifiedTeams = sortPosition(results);

    return classifiedTeams;
  };

  leaderboardAway = async () => {
    const awayTeams = await LeaderboardServices.getAwayTeams();
    const results = await Promise.all(awayTeams);
    const classifiedTeams = sortPosition(results);

    return classifiedTeams;
  };
}
