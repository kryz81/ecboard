import { Context } from 'koa';

import HealthcheckService from '../services/HealthcheckService';

export default class Healthcheck {
  static async get(ctx: Context) {
    const appsService = new HealthcheckService();
    try {
      ctx.body = await appsService.getHealth();
    } catch (err) {
      ctx.status = 503;
      ctx.body = { msg: 'Cannot get healthcheck info' };
    }
  }
}
