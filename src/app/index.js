const path = require("path");

const Koa = require("koa");

const koaBody = require("koa-body");

const koaParameter = require("koa-parameter");

const koaStatic = require("koa-static");

const koaCors = require("koa-cors");

const errorHandle = require("./error.handle");

const router = require("../router/index.route");

const app = new Koa();

// 设置允许跨域
// app.use(koaCors())

app.use(
  koaBody({
    multipart: true, // 开启上传
    formidable: {
      // 绝对路径 __dirname 当前文件的绝对路径
      uploadDir: path.join(__dirname, "../upload"),
      keepExtensions: true, // 保留图片类型
    },
    parsedMethods: ["POST", "PUT", "PATCH", "DELETE"],
  })
); // 一定要在注册之前

// 静态文件 localhost:8000/filename
app.use(koaStatic(path.join(__dirname, "../upload")));

// 参数校验中间件
app.use(koaParameter(app));

app.use(router.routes());

// 同一错误处理
app.on("error", errorHandle);

module.exports = app;
