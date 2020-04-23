import Koa from 'koa';
import helmet from 'koa-helmet';
import cors from '@koa/cors';
import auth from '../middleware/auth';
import Router from './Router';

export default class App {
  protected readonly app: Koa;
  protected readonly router: Router;

  constructor() {
    this.app = new Koa();
    this.router = new Router();
  }

  init(): Koa {
    const app = this.app;

    app.use(helmet());
    app.use(cors());
    app.use(auth);

    const koaRouter = this.router.registerRoutes();

    app.use(koaRouter.routes());
    app.use(koaRouter.allowedMethods());

    return this.app;
  }

  listen(port: number) {
    return this.app.listen(port);
  }
}
