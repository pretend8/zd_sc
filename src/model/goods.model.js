const { DataTypes } = require('sequelize');
const seq = require('../db/seq');

const Goods = seq.define(
  'zd_goods',
  {
    goods_name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '商品名称',
    },
    goods_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '商品价格',
    },
    goods_num: {
      type: DataTypes.INTEGER,
      allowNull: null,
      defaultValue: 1,
      comment: '商品数量',
    },
    goods_img: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '商品图片',
    },
  },
  {
    paranoid: true, // 增加软删除标志
  },
);

// Goods.sync({ force: true });

module.exports = Goods;
