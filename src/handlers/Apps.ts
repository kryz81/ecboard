import { Context } from 'koa';

import AppsService from '../services/AppsService';

export default class Apps {
  static async list(ctx: Context) {
    const appsService = new AppsService();
    try {
      ctx.body = await appsService.getProcessList();
    } catch (err) {
      ctx.status = 503;
      ctx.body = { msg: 'Cannot get pm2 processes' };
    }
  }
}
