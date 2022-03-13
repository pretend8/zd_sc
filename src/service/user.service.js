const User = require('../model/user.model');

class UserService {
  // 创建函数
  async createUser(user_name, password) {
    // User create方法 https://www.sequelize.com.cn/core-concepts/model-querying-basics
    const res = await User.create({
      // 表的字段&值
      user_name,
      password,
    });

    // console.log(res, "UserService");
    return res.dataValues;
  }

  async getUserInfo({ id, user_name, password, is_admin }) {
    const whereOpt = {};
    id && Object.assign(whereOpt, { id });
    user_name && Object.assign(whereOpt, { user_name });
    password && Object.assign(whereOpt, { password });
    is_admin && Object.assign(whereOpt, { is_admin });

    const res = await User.findOne({
      attributes: ['id', 'user_name', 'password', 'is_admin'],
      where: whereOpt,
    });
    
return res ? res.dataValues : null;
  }

  // updateUserInfo
  async updateById({ id, user_name, password, is_admin }) {
    const whereOpt = { id };
    const finalOpt = {};
    password && Object.assign(finalOpt, { password });
    user_name && Object.assign(finalOpt, { user_name });
    is_admin && Object.assign(finalOpt, { is_admin });

    const res = await User.update(finalOpt, {
      where: whereOpt,
    });
    console.log(res, 'res');
    console.log(res.dataValues);
    
return res && res.length ? res : null;
  }
}

module.exports = new UserService();
