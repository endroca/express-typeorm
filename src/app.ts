import * as express from 'express';
import routes from './routes';

interface Controllers {
  path: string;
  fnc: any;
}

export default class App {
  public express: express.Application;

  private port: number;

  public constructor(settings: {
    port: number;
    controllers: Controllers[];
    middlewares: any[];
  }) {
    this.express = express();

    this.routes();
    this.middlewares(settings.middlewares);
    this.controllers(settings.controllers);

    this.port = settings.port;
  }

  private routes() {
    this.express.use(routes);
  }

  private middlewares(middleWares: any[]) {
    middleWares.forEach((middleWare) => {
      this.express.use(middleWare);
    });
  }

  private controllers(controllers: Controllers[]) {
    controllers.forEach((controller) => {
      this.express.use(controller.path, controller.fnc.router);
    });
  }

  public listen() {
    this.express.listen(this.port, () => {
      // eslint-disable-next-line no-console
      console.log(`App listening on the http://localhost:${this.port}`);
    });
  }
}
