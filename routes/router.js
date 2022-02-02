import cardController from '../controllers/cardController.js';
import familyController from '../controllers/familyController.js';

export const setupRoutes = (app) => {
  app.use('/cards', cardController);
  app.use('/families', familyController);
}