import cardController from '../controllers/cardController.js';
import familyController from '../controllers/familyController.js';
import playerController from '../controllers/playerController.js';

export const setupRoutes = (app) => {
  app.use('/cards', cardController);
  app.use('/families', familyController);
  app.use('/players', playerController)
}