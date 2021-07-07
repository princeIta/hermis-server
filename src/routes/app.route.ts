import { Router } from 'express';

import AuthController from '../controllers/auth.controller';
import ClientController from '../controllers/client.controller';
import ScheduledMessageController from '../controllers/messaging';
import shield from '../middlewares/shield.middleware';
import services from '../services';
import { httpAuthMiddleware } from '../middlewares/auth.middleware';

const router = Router();

const authController = new AuthController(services);
const clientController = new ClientController(services);
const scheduledMessageController = new ScheduledMessageController(services);

// Auth
router.post('/login', authController.login);

router.use(httpAuthMiddleware);

// Clients
router.post('/client', shield(), clientController.createClient);
router.get('/client/list', shield(), clientController.getAllClients);
router.put(
  '/client/:clientId/active',
  shield(),
  clientController.activateClient
);
router.put(
  '/client/:clientId/inactive',
  shield(),
  clientController.deactivateClient
);

// Messsaging
router.get(
  '/s-messages/:clientId',
  shield(),
  scheduledMessageController.getMessagesScheduledForClient
);
router.post(
  '/s-message/:clientId',
  shield(),
  scheduledMessageController.scheduleMessage
);
router.delete(
  '/s-message/:messageId',
  shield(),
  scheduledMessageController.deleteScheduledMessage
);
router.post(
  '/i-message/:clientId',
  shield(),
  scheduledMessageController.sendInstantMessageToClient
);

export default router;
