const Goods = require("../model/goods.model");

class GoodsService {
  async createGoods(goods) {
    const res = await Goods.create(goods);
    return res.dataValues ? res.dataValues : null;
  }
  async updateGoods() {}
  async removeGoods() {}
  async getAllGoods() {}
  async onGoods() {}
  async offGoods() {}
}

module.exports = new GoodsService();
