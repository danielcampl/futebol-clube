import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import token from '../middlewares/tokens';
import matchesAuth from '../middlewares/matchesAuth';

const MatchesRouter = Router();
const matchesController = new MatchesController();

MatchesRouter.get('/', (req, res) => matchesController.findMatch(req, res));
MatchesRouter.patch(
  '/:id/finish',
  token,
  (req, res) => matchesController.finishedMatch(req, res),
);
MatchesRouter.patch('/:id', token, (req, res) => matchesController.updateMatch(req, res));
MatchesRouter.post(
  '/',
  token,
  matchesAuth,
  (req: Request, res: Response) => matchesController.createMatch(req, res),
);

export default MatchesRouter;
