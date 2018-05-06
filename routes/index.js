const Router = require('koa-router');
const fillPdf = require('../lib/fill-pdf');

const router = new Router();

router.get('/', async (ctx, next) => {
  // TODO: validate verification token
  const verificationToken = ctx.request.header['verification-token'];
  const challenge = ctx.request.query['challenge'];

  ctx.body = challenge;
});

const templateMapping = {
  'f91b0c80-8038-404c-996a-c19d81fc8133': 'precision-dental.pdf',
  'f91b0c80-8038-404c-996a-c19d81fc8134': 'absolute-dental.pdf',
};

router.post('/', async (ctx, next) => {
  const { Meta, Patient } = ctx.request.body;

  const id = 'f91b0c80-8038-404c-996a-c19d81fc8134';

  if (Meta.DataModel !== 'PatientAdmin' || Meta.EventType !== 'NewPatient') {
    ctx.throw(400);
  }

  await fillPdf(templateMapping[id], Patient);

  ctx.body = {};
})

module.exports = router;