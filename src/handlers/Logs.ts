import { Context } from 'koa';
import AppsService from '../services/AppsService';

import LogsService from '../services/LogsService';

export default class Logs {
  static async details(ctx: Context) {
    const logsService = new LogsService(new AppsService());
    try {
      const [errorData, outData] = await logsService.getLog(ctx.params.appName);
      ctx.body = {
        errorData,
        outData,
      };
    } catch (err) {
      ctx.status = 503;
      ctx.body = { msg: 'Cannot get pm2 logs' };
    }
  }
}
