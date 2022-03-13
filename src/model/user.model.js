const { DataTypes } = require('sequelize');

const seq = require('../db/seq');

// 创建模型（Model zd_user => zd_users）// 会自动推断加s
const User = seq.define(
  'zd_user',
  {
    // id 会被sequelize 自动创建，管理
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: '用户名，唯一',
    },
    password: {
      type: DataTypes.CHAR(64),
      allowNull: false,
      comment: '密码',
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: '是否为管理员，0:不是管理员（默认），1:是管理员',
    },
  },
  { timestamps: true }, // 是否自带创建时间
);

// 强制同步数据库（创建数据表）
// User.sync({
//   force: true, // 如果存在这张表 会删除之后创建
// });

module.exports = User;
