const Router = require("koa-router");

const { register, login } = require("../controller/user.controller");

const {
  userValidator,
  verifyUser,
  cryptPassword,
} = require("../middleware/user.middleware");

//  实例话对象
const router = new Router({ prefix: "/users" });

router.get("/", (ctx, next) => {
  ctx.body = "hello users";
});

// 注册接口
router.post("/register", userValidator, verifyUser, cryptPassword, register);

// 登录接口
router.post("/login", login);

module.exports = router;
