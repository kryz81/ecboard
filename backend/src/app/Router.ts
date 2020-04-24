import KoaRouter from 'koa-router';
import AppsHandler from '../handlers/Apps';
import LogsHandler from '../handlers/Logs';
import HealthcheckHandler from '../handlers/Healthcheck';

export default class Router {
  protected readonly koaRouter: KoaRouter;

  constructor() {
    this.koaRouter = new KoaRouter();
  }

  registerRoutes(prefix = '/api'): KoaRouter {
    this.koaRouter.prefix(prefix);
    this.koaRouter
      .get('/apps', AppsHandler.list)
      .get('/logs/:appName', LogsHandler.details)
      .get('/healthcheck', HealthcheckHandler.get);

    return this.koaRouter;
  }
}
