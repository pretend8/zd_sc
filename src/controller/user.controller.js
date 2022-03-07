const jwt = require("jsonwebtoken");

const {
  createUser,
  getUserInfo,
  updateById,
} = require("../service/user.service");

const {
  userRegisterError,
  userLoginError,
  userUpdateError,
} = require("../constant/err.type");

const { JWT_SECRET } = require("../config/config.default");
const app = require("../app");

class UserController {
  // controller 叫注册 在service 里面叫做create
  async register(ctx, next) {
    // 1. 获取数据
    // console.log(ctx.request.body);
    const { user_name, password } = ctx.request.body;

    // 2. 操作数据库
    try {
      const res = await createUser(user_name, password);
      // console.log(res, "UserController");
      // 3. 返回数据
      ctx.body = {
        code: 0,
        message: "用户注册成功",
        result: {
          id: res.id,
          user_name: res.user_name,
        },
      };
    } catch (err) {
      console.log(err);
      ctx.app.emit("error", userRegisterError, ctx);
    }
  }
  async login(ctx, next) {
    const { user_name } = ctx.request.body;
    // 1.获取用户信息 (在token的payload中记录id，user_name ，is_admin)
    try {
      const { password, ...res } = await getUserInfo({ user_name });
      ctx.body = {
        code: 0,
        message: "用户登录成功",
        result: {
          token: jwt.sign(res, JWT_SECRET, { expiresIn: "1d" }), // 过期时间1天
        },
      };
    } catch (err) {
      console.error("用户登录失败：", err);
      return ctx.app.emit("error", userLoginError, ctx);
    }
  }

  async changePassword(ctx, next) {
    console.log("changePassword chufale");
    // 1. 获取数据
    const id = ctx.state.user.id;
    console.log("id:" + id);
    const password = ctx.request.body.password;
    console.log("password:" + password);
    console.log(id, password);
    // 2. 操作数据库
    try {
      if (await updateById({ id, password })) {
        ctx.body = {
          code: 0,
          message: "修改密码成功",
          result: "",
        };
      } else {
        console.error("修改密码失败");
        ctx.app.emit("error", userUpdateError, ctx);
        return;
      }
      // todo
    } catch (err) {
      console.error("修改密码失败:" + err);
      ctx.app.emit("error", userUpdateError, ctx);
      return;
    }
    // 3. 返回结果
    await next();
  }
}

module.exports = new UserController();
