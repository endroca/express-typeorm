import 'reflect-metadata';
import { createConnection } from 'typeorm';

/**
 * MiddleWare
 */
import { json } from 'express';
import * as cors from 'cors';

/**
 * Controllers
 */
import UserController from './controllers/user';

import App from './app';

(async () => {
  await createConnection();

  const app = new App({
    port: 3333,
    controllers: [
      {
        path: '/users',
        fnc: new UserController(),
      },
    ],
    middlewares: [json(), cors()],
  });

  app.listen();
})();
