const usersModel = require('../models').Users;

module.exports = {
  async getOne(data) {
    try {
      const user = await usersModel.find({
        where: {
          username: data.username,
          password: data.password,
          isDeleted: 0,
        },
      });
      return user;
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  },
  async getActives() {
    try {
      const users = await usersModel.findAll({
        where: {
          isDeleted: 0,
        },
      });
      return {
        success: true,
        users,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  },
  async addUser(data) {
    try {
      if (!data.username || !data.password || !data.isAdmin) {
        return {
          success: false,
          message: 'Parameters is not valid',
        };
      }
      const user = {
        username: data.username,
        password: data.password,
        isAdmin: data.isAdmin,
      };
      await usersModel.create(user);
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  },
  async updateUser(data) {
    try {
      const rootUser = await usersModel.find({
        where: {
          username: 'root',
        },
      });

      if (!data.id || !parseInt(data.id) || parseInt(data.id) === rootUser.id) {
        return {
          success: false,
          message: 'Parameter is not valid',
        };
      }
      const updatedValues = {};
      /*eslint-disable */
      for (const item in data) {
        if (item !== 'id') {
          updatedValues[item] = data[item];
        }
      }
      await usersModel.update(updatedValues, {
        where: {
          id: data.id,
        },
      });
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  },
  async softDeleteUser(id) {
    try {
      const rootUser = await usersModel.find({
        where: {
          username: 'root',
        },
      });
      if (!id || !parseInt(id) || parseInt(id) === rootUser.id) {
        return {
          success: false,
          message: 'Parameter is not valid',
        };
      }
      await usersModel.update(
        {
          isDeleted: true,
        },
        {
          where: {
            id: id,
          },
        },
      );
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  },
};
