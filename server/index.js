const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const router = new Router();

//
router.get('/api', async (ctx, next) => {
  ctx.body = {
    name: '张三'
  }
});

// 注册中间件
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

// app.use(async ctx => {
//   ctx.body = 'Hello Vercel';
// });


app.listen(3008, () => {
  console.log('3008项目启动', 'http://localhost:3008')
});
