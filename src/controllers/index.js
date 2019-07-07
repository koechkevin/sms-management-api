import express from 'express';
import contactsRouter from './contacts';
import messages from './sms';
import authRouter from './authentication';

const routers = [contactsRouter, messages, authRouter];
const router = express.Router();

const routes = (app) => {
  routers.forEach((route) => {
    router.use(route);
  });
  app.use('/api', router);
  return app;
};

export default routes;
