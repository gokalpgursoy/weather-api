const usersService = require('../services/usersService');

module.exports = {
  async get(req, res, next) {
    try {
      const data = await usersService.getActives();
      if (!data.success) {
        next(data.error);
      }
      res.send(data.users);
    } catch (error) {
      next(error);
    }
  },
  async getUsersInfo(req, res, next) {
    try {
      const data = await usersService.getUsersInfo();
      if (!data.success) {
        next(data.error);
      }
      res.send(data.users);
    } catch (error) {
      next(error);
    }
  },
  async post(req, res, next) {
    try {
      const data = await usersService.addUser(req.body);
      if (!data.success) {
        if (data.hasOwnProperty('message')) {
          res.status(500).send(data.message);
        }
        next(data.error);
      }
      res.send({
        success: data.success,
        message: 'User added successfully',
      });
    } catch (error) {
      next(error);
    }
  },
  async put(req, res, next) {
    try {
      const data = await usersService.updateUser(req.body);
      if (!data.success) {
        if (data.hasOwnProperty('message')) {
          res.status(500).send(data.message);
        }
        next(data.error);
      }
      res.send({
        success: data.success,
        message: 'User updated successfully',
      });
    } catch (error) {
      next(error);
    }
  },
  async delete(req, res, next) {
    try {
      const data = await usersService.softDeleteUser(req.body.id);
      if (!data.success) {
        if (data.hasOwnProperty('message')) {
          res.status(500).send(data.message);
        }
        next(data.error);
      }
      res.send({
        success: data.success,
        message: 'User deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  },
};
