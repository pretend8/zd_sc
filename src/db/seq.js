const { Sequelize } = require('sequelize');
// const {
//   MYSQL_HOST,
//   MYSQL_USER,
//   MYSQL_PWD,
//   MYSQL_DB,
// } = require('../config/config.default');

const seq = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PWD, {
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',
  dialectOptions: {
    socketPath: '/tmp/mysql.sock', // 指定套接字文件路径 远程连不上可以使用
  },
  timezone: '+08:00',
});

seq
  .authenticate()
  .then(() => {
    console.log('数据库连接成功');
  })
  .catch((e) => {
    console.log('数据库连接失败：' + e);
  });

module.exports = seq;

// route 实现将匹配不同的URL 转发给我们的controller
// controller 实现我们的业务逻辑
// service 主要是操作数据库
// service 通过model定义的数据模型来操作数据库
