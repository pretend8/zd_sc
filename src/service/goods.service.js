const Goods = require("../model/goods.model");

class GoodsService {
  async createGoods(goods) {
    const res = await Goods.create(goods);
    return res.dataValues ? res.dataValues : null;
  }
  async updateGoods() {
    // try{
    //   const res = await Goods.update({},{
    //     where:{
    //       id
    //     }
    //   })
    // }
  }
  async removeGoods() {}
  async getAllGoods(pageNum, pageSize) {
    const offset = pageSize*(pageNum - 1)
    const res = await Goods.findAndCountAll({
      offset: offset,
      limit: pageSize * 1,
    })
    return res
  }
  async onGoods() {}
  async offGoods() {}
}

module.exports = new GoodsService();
