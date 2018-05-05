const Router = require('koa-router');

const router = new Router();

router.get('/', async (ctx, next) => {
  // TODO: validate verification token
  const verificationToken = ctx.request.header['verification-token'];
  const challenge = ctx.request.query['challenge'];

  ctx.body = challenge;
});

router.post('/', async (ctx, next) => {
  const { Meta, Patient } = ctx.request.body;

  if (Meta.DataModel !== 'PatientAdmin' || Meta.EventType !== 'NewPatient') {
    ctx.throw(400);
  }

  // TODO: trigger processing

  ctx.body = {};
})

module.exports = router;