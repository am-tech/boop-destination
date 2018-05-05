const Router = require('koa-router');
const util = require('util');

const router = new Router();

router.get('/', async (ctx, next) => {
  const verificationToken = ctx.request.header['verification-token'];
  const challenge = ctx.request.query['challenge'];

  util.log('token', verificationToken, 'challenge', challenge);

  ctx.body = challenge;
});

module.exports = router;