const path = require("path");

const jwt = require("jsonwebtoken");

const {
  createGoods,
  updateGoods,
  removeGoods,
  onGoods,
  offGoods,
  getAllGoods,
} = require("../service/goods.service");

const {
  fileTypeError,
  publishGoodsError,
  goodsFormatError,
} = require("../constant/err.type");

class GoodsController {
  // 商品图片上传
  async upload(ctx) {
    const { file } = ctx.request.files;
    const fileType = ["image/jpeg", "image/jpg", "image/png"];

    // 多张图片
    if (file && Array.isArray(file)) {
      // 格式校验
      if (file.some((val) => fileType.includes(val.type))) {
        const tempList = file.map((val) => {
          return { goods_img: path.basename(val.path) };
        });
        ctx.body = {
          code: 0,
          message: "图片上传成功",
          result: tempList,
        };
      } else {
        return ctx.app.emit("error", fileTypeError, ctx);
      }
    } else {
      if (fileType.includes(file.type)) {
        ctx.body = {
          code: 0,
          message: "图片上传成功",
          result: {
            goods_img: path.basename(file.path),
          },
        };
      } else {
        return ctx.app.emit("error", fileTypeError, ctx);
      }
    }
  }
  // 商品发布
  async create(ctx) {
    try {
      const res = await createGoods(ctx.request.body);
      if (res) {
        ctx.body = {
          code: 0,
          message: "商品发布成功",
          result: res,
        };
      } else {
        console.error("商品发布失败");
        ctx.app.emit("error", publishGoodsError, ctx);
      }
    } catch (error) {
      console.error(error);
      ctx.app.emit("error", publishGoodsError, ctx);
    }
  }

  // 商品查询
  async findAll(ctx) {
    console.log(ctx.request.body,'ctx')
    console.log(ctx.request.params,'http')
    const { pageNum =1, pageSize=10 } = ctx.request.params;
    try{
      const res = await getAllGoods(pageNum,pageSize);
        ctx.body = {
          code: 0,
          message:"商品获取成功",
          result:res
        }
     

      console.log(res)
    }catch(err){
      console.error(err)
      ctx.app.emit('error',getGoodsError,ctx)
    }
    
  }
  // 商品更新
  async update(ctx) {
    try {
      const res = await updateGoods(ctx.request.body);
      if (res) {
        ctx.body = {
          code: 0,
          message: "商品发布成功",
          result: res,
        };
      } else {
        console.error("商品发布失败");
        ctx.app.emit("error", publishGoodsError, ctx);
      }
    } catch (error) {
      console.error(error);
      ctx.app.emit("error", publishGoodsError, ctx);
    }
  }
  // 商品上架
  async up(ctx) {
    await onGoods();
  }
  // 商品下架
  async down(ctx) {
    await offGoods();
  }
  // 商品删除
  async remove(ctx) {
    await removeGoods();
  }
}

module.exports = new GoodsController();
