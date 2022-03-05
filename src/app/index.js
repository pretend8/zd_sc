const Koa = require("koa");

const koaBody = require("koa-body");

const app = new Koa();

const userRouter = require("../router/user.route");

app.use(koaBody()); // 一定要在注册之前

app.use(userRouter.routes());

module.exports = app;
