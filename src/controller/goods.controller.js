const jwt = require("jsonwebtoken");

const {
  createGoods,
  updateGoods,
  removeGoods,
  onGoods,
  offGoods,
  getAllGoods,
} = require("../service/goods.service");

class GoodsController {
  // 商品上传
  async upload(ctx) {
    await createGoods();
  }

  // 商品查询
  async findAll(ctx) {
    await getAllGoods();
  }
  // 商品更新
  async update(ctx) {
    await updateGoods();
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
