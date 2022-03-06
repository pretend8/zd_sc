const bcrypt = require("bcryptjs");

const { getUserInfo } = require("../service/user.service");

const {
  userFormateError,
  userAlreadyExited,
  userRegisterError,
  userDoesNotExist,
  userLoginError,
  invalidPassword,
} = require("../constant/err.type");
const { get } = require("../router/user.route");

const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  // 合法性
  if (!user_name || !password) {
    console.log("用户名或密码为空", ctx.request.body);
    ctx.app.emit("error", userFormateError, ctx);
    return;
  }
  await next();
};

const verifyUser = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  // 合理性
  try {
    const res = await getUserInfo({ user_name });
    if (res) {
      console.error("用户名已经存在", ctx.request.body);
      ctx.app.emit("error", userAlreadyExited, ctx);
      return;
    }
  } catch (err) {
    console.error("获取用户信息错误", err);
    ctx.app.emit("error", userRegisterError, ctx);
    return;
  }

  await next();
};

const cryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  const salt = bcrypt.genSaltSync(10);
  // hash 保存的是密文
  const hash = bcrypt.hashSync(password, salt);
  ctx.request.body.password = hash;
  // 交由下一步中间件
  await next();
};

// 校验登录中间件
const verifyLogin = async (ctx, next) => {
  // 1 判断用户名是否存在
  const { user_name, password } = ctx.request.body;

  try {
    const res = await getUserInfo({ user_name });
    if (!res) {
      return ctx.app.emit("error", userDoesNotExist, ctx);
    }
    // 2 密码是否匹配
    if (!bcrypt.compareSync(password, res.password)) {
      return ctx.app.emit("error", invalidPassword, ctx);
    }
  } catch (err) {
    console.log("用户登录失败：", err);
    return ctx.app.emit("error", userLoginError, ctx);
  }

  await next();
};

module.exports = { userValidator, verifyUser, cryptPassword, verifyLogin };
