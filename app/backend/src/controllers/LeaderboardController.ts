import { Request, Response } from 'express';
import LeaderboardServices from '../services/LeaderboardServices';

export default class LeaderboardController {
  constructor(private leaderboardServices = new LeaderboardServices()) {}

  async leaderboardTotal(_req: Request, res: Response) {
    const leaderboard = await this.leaderboardServices.leaderboardTotal();

    return res.status(200).json(leaderboard);
  }

  async leaderboardHome(_req: Request, res: Response) {
    const leaderboard = await this.leaderboardServices.leaderboardHome();

    return res.status(200).json(Object.values(leaderboard));
  }

  async leaderboardAway(_req: Request, res: Response) {
    const leaderboard = await this.leaderboardServices.leaderboardAway();

    return res.status(200).json(Object.values(leaderboard));
  }
}
