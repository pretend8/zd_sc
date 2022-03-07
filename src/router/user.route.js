const Router = require("koa-router");

const { register, login } = require("../controller/user.controller");

const {
  userValidator,
  verifyUser,
  cryptPassword,
  verifyLogin,
} = require("../middleware/user.middleware");
const { auth } = require("../middleware/auth.middleware");

//  实例话对象
const router = new Router({ prefix: "/users" });

router.get("/", (ctx, next) => {
  ctx.body = "hello users";
});

// 注册接口
router.post("/register", userValidator, verifyUser, cryptPassword, register);

// 登录接口
router.post("/login", userValidator, verifyLogin, login);

// 修改密码接口
router.patch("/", auth, cryptPassword, (ctx, next) => {
  ctx.body = "修改密码成功";
});

module.exports = router;
