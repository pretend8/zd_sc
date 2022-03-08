const { goodsFormatError } = require("../constant/err.type");
// 商品格式校验中间件
const validator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      goods_name: { type: "string", require: true },
      goods_price: { type: "number", require: true },
      goods_num: { type: "number", require: true },
      goods_img: { type: "string", require: true },
    });
  } catch (error) {
    console.error(error);
    goodsFormatError.result = error;
    return ctx.app.emit("error", goodsFormatError, ctx);
  }
  await next();
};

module.exports = {
  validator,
};
