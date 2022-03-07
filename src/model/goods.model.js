const { DataTypes } = require("sequelize");
const seq = require("../db/seq");

const Goods = seq.define(
  "zd_goods",
  {
    goods_name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "商品名称",
    },
    goods_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "商品价格",
    },
    good_img: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "商品图片",
    },
  },
  {
    timestamps: true,
    deletedAt: true,
  }
);

Goods.sync({ force: true });

module.exports = Goods;
