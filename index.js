const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const util = require('util');
const router = require('./routes');

const PORT = process.env.PORT || 3000;
const app = new Koa();

if (process.env.NODE_ENV !== 'production') {
  app.use(require('koa-morgan')('combined'));
}

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => util.log(`Boopin' on port ${PORT}`));