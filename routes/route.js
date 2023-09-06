const Router = require('koa-router');
const combineRouters = require('koa-combine-routers');
const sseRouter = require('./sse');
// const wsRouter = require('./ws');
// const r = require('../server');
const ping = new Router();

ping.get('/ping', async ctx => {
   ctx.body = 'pong';
   // console.log(123);
   //ctx.response.body
})
ping.get('/index', async (ctx) => {
   ctx.response.body = 'hello';
});

const router = combineRouters(
   ping,
   sseRouter,

)
module.exports = router;