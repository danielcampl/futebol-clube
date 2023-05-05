import { NextFunction, Request, Response } from 'express';
import TeamsServices from '../services/TeamServices';

async function matchesAuth(req: Request, res: Response, next: NextFunction) {
  const { homeTeamId, awayTeamId } = req.body;
  const teamsService = new TeamsServices();

  if (homeTeamId === awayTeamId) {
    return res.status(422).json(
      { message: 'It is not possible to create a match with two equal teams' },
    );
  }

  const idHomeTeam = await teamsService.findOne(homeTeamId);
  const idAwayTeam = await teamsService.findOne(awayTeamId);

  if (!idAwayTeam || !idHomeTeam) {
    return res.status(404).json(
      { message: 'There is no team with such id!' },
    );
  }

  next();
}

export default matchesAuth;
