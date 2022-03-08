// 商品格式校验中间件
const validator = async (ctx, next) => {
  await next();
};

module.exports = {
  validator,
};
