# 一.项目的初始化

## 1 npm初始化

```javascript
npm init -y 
```

生成package.json文件：

- 记录项目的依赖

## 2 git初始化

```javascript
git init
```

生成.git隐藏文件夹 git的本地仓库

## 3 创建ReadMe文件



# 二.搭建项目

## 1 安装koa框架

```javascript
npm i koa
```

## 2 编写最基本的app

编写 `src\main.js`

```javascript
const Koa = require("koa");

const app = new Koa();

app.use((ctx, next) => {
  ctx.body = "hello world";
});

app.listen(3000, () => {
  console.log("server is running on http://localhost:3000");
});
```



## 3 测试

在终端 使用 node src/main.js

