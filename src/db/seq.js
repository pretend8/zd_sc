const { Sequelize } = require("sequelize");
const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PWD,
  MYSQL_DB,
} = require("../config/config.default");

const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  dialect: "mysql",
  timezone: "+08:00",
});

seq
  .authenticate()
  .then(() => {
    console.log("数据库连接成功");
  })
  .catch((e) => {
    console.log("数据库连接失败：" + e);
  });

module.exports = seq;

// route 实现将匹配不同的URL 转发给我们的controller
// controller 实现我们的业务逻辑
// service 主要是操作数据库
// service 通过model定义的数据模型来操作数据库
