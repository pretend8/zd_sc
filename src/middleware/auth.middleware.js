const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config/config.default');

const { tokenExpiredError, invalidToken } = require('../constant/err.type');

const auth = async (ctx, next) => {
  const { authorization = '' } = ctx.request.header;
  const token = authorization.replace('Bearer ', '');
  console.log('token:' + token);
  try {
    const user = jwt.verify(token, JWT_SECRET);
    ctx.state.user = user;
  } catch (err) {
    switch (err.name) {
      case 'TokenExpiredError':
        console.error('token已过期', err);
        
return ctx.app.emit('error', tokenExpiredError, ctx);
      case 'JsonWebTokenError':
        console.error('无效的token', err);
        
return ctx.app.emit('error', invalidToken, ctx);
      default :
        console.error('token invalid');
        break;
    }
  }
  await next();
};

// 管理员权限校验中间件
const hasAdminPermission = async (ctx, next) => {
  await next();
};

module.exports = {
  auth,
  hasAdminPermission,
};
