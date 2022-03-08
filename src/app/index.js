const path = require("path");

const Koa = require("koa");

const koaBody = require("koa-body");

const serve = require("koa-static");

const errorHandle = require("./error.handle");

const router = require("../router/index.route");

const app = new Koa();

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
app.use(serve(path.join(__dirname, "../upload")));

app.use(router.routes());

// 同一错误处理
app.on("error", errorHandle);

module.exports = app;
