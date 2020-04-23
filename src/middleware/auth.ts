import { Context, Next } from 'koa';
import { ACCESS_TOKEN } from '../config/config';

export default async function auth(ctx: Context, next: Next) {
  if (ctx.query.token !== ACCESS_TOKEN) {
    ctx.status = 403;
    ctx.body = { msg: 'Access denied' };
    return;
  }

  await next();
}
