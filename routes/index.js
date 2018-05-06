const Router = require('koa-router');
const fillPdf = require('../lib/fill-pdf');

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

  await fillPdf('Patient_Info_with_fields.pdf', Patient);

  ctx.body = {};
})

module.exports = router;