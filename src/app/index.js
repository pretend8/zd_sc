const Koa = require("koa");

const koaBody = require("koa-body");

const errorHandle = require("./error.handle");

const userRouter = require("../router/user.route");

const app = new Koa();

app.use(koaBody()); // 一定要在注册之前

app.use(userRouter.routes());

// 同一错误处理
app.on("error", errorHandle);

module.exports = app;
