import KoaRouter from 'koa-router';
import AppsHandler from '../handlers/Apps';
import LogsHandler from '../handlers/Logs';

export default class Router {
  protected readonly koaRouter: KoaRouter;

  constructor() {
    this.koaRouter = new KoaRouter();
  }

  registerRoutes(prefix = '/api'): KoaRouter {
    this.koaRouter.prefix(prefix);
    this.koaRouter.get('/apps', AppsHandler.list).get('/logs/:id', LogsHandler.details);

    return this.koaRouter;
  }
}
