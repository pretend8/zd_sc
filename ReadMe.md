# 一. 项目的初始化

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



# 二. 搭建项目

## 1 安装koa框架

```javascript
npm i koa
```

## 2 编写最基本的app

编写 `src/main.js`

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

# 三. 项目的基本优化

## 1 自动重启服务

安装nodemon工具

```js
npm i nodemon	-D
```

编写package.json脚本

```js
"scripts": {
    "dev": "nodemon ./src/main.js",
    "test": "echo \"Error: no test specified\" && exit 1"
 },
```

执行 npm run dev

## 2 读取配置文件

安装`dotenv` 读取根目录中的`.env` 文件 将配置写到`process.env`中

```js
npm i dotenv
```

创建 `.env`文件

```js
APP_PORT=8000
```

创建`src/config/config.default.js`

```js
const dotenv = require("dotenv");
dotenv.config();

// console.log(process.env.APP_PORT);

module.exports = process.env;
```

改写`main.js`

```js
const Koa = require("koa");
const { APP_PORT } = require("./config/config.default");

const app = new Koa();

app.use((ctx, next) => {
  ctx.body = "hello world 111" + APP_PORT;
});

app.listen(APP_PORT, () => {
  console.log(`server is running on http://localhost:${APP_PORT}`);
});

```

# 四. 添加路由

路由：根据不同的URL 调用对应处理函数

## 1. 安装koa-router

```js
npm i koa-router
```

步骤：

	1. 导入包
 	2. 实例化对象
 	3. 编写路由
 	4. 注册中间件

## 2. 编写路由

创建`src/router`目录 编写`user.route.js`

```js
// 导入包
const Router = require('koa-router')

// 实例话对象 prefix 就是匹配都带上/users
const userRouter = new Router({prefix:"/users"})

// 路由编写
userRouter.get("/",(ctx, next) => {
	ctx.body = "hello users"
})

module.exports = userRouter
```

## 3. 改写main.js

```js
const Koa = require("koa");

const { APP_PORT } = require("./config/config.default");

const app = new Koa();

const userRouter = require("./router/user.route");

// 注册中间件
app.use(userRouter.routes());

app.listen(APP_PORT, () => {
  console.log(`server is running on http://localhost:${APP_PORT}`);
});
```

# 五. 目录结构的优化

## 1. 将http服务和app业务拆分

创建`src/app/index.js`

```js
const Koa = require("koa");

const app = new Koa();

const userRouter = require("../router/user.route");

app.use(userRouter.routes());

module.exports = app;

```

改写`main.js`

```js
const { APP_PORT } = require("./config/config.default");

const app = require("./app");

app.listen(APP_PORT, () => {
  console.log(`server is running on http://localhost:${APP_PORT}`);
});
```

## 2. 将路由和控制器进行拆分

路由：解析URL,分布给控制器对应的方法

控制器： 处理不同的业务

改写`user.route.js`

```js
const Router = require("koa-router");

const { register, login } = require("../controller/user.controller");

//  实例话对象
const router = new Router({ prefix: "/users" });

// 注册接口
router.post("/register", register);

// 登录接口
router.post("/login", login);

module.exports = router;
```

创建`controller/user.controller.js`

```js
class UserController {
  async register(ctx, next) {
    ctx.body = "用户注册成功";
  }
  async login(ctx, next) {
    ctx.body = "登录成功";
  }
}

module.exports = new UserController();
```

# 六. 解析body

## 1. 安装koa-body

```js
npm i koa-body
```

## 2. 注册中间件

改写`src/app/index.js`

```js
const Koa = require("koa");

const koaBody = require("koa-body");

const app = new Koa();

const userRouter = require("../router/user.route");

app.use(koaBody()); // 一定要在注册之前

app.use(userRouter.routes());

module.exports = app;
```

## 3. 解析请求数据

改写`user.controller.js`

```js
const { createUser } = require("../service/user.service");

class UserController {
  // controller 叫注册 在service 里面叫做create
  async register(ctx, next) {
    // 1. 获取数据
    // console.log(ctx.request.body);
    const { user_name, password } = ctx.request.body;
    // 2. 操作数据库
    const res = await createUser(user_name, password);
    console.log(res);
    // 3. 返回数据
    ctx.body = res;
  }
  async login(ctx, next) {
    ctx.body = "注册成功";
  }
}

module.exports = new UserController();
```

## 4. 拆分service层

service层主要是做数据库处理

创建`src/service/user.service.js`

```js
class UserService {
  async createUser(user_name, password) {
    // todo: 写入数据库
    return "写入数据库成功";
  }
}

module.exports = new UserService();
```

