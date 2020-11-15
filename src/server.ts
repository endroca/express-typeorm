import { config } from 'dotenv';
import { resolve } from 'path';
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

/**
 * Import APP
 */
import App from './app';

config({ path: resolve(__dirname, '../.env') });

(async () => {
  await createConnection();

  const app = new App({
    port: Number(process.env.PORT) || 3333,
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
