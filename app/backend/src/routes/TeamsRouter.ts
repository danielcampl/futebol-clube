import { Router, Response, Request } from 'express';
import TeamsController from '../controllers/TeamsController';

const teamsRouter = Router();
const teamsController = new TeamsController();

teamsRouter.get('/', (req: Request, res: Response) => teamsController.findAll(req, res));
teamsRouter.get('/:id', (req: Request, res: Response) => {
  teamsController.findOne(req, res);
});

export default teamsRouter;
