const jwt = require('jsonwebtoken');
const config = require('../config');
const usersService = require('../services/usersService');

module.exports = {
  async generateToken(req, res, next) {
    try {
      const user = await usersService.getOne(req.body);
      if (!user) {
        res.status(401).send({
          success: false,
          message: 'Token is not defined.',
        });
      }
      const payload = {
        id: user.id,
      };
      const token = await jwt.sign(payload, config.authentication.jwtSecret, {
        expiresIn: parseInt(config.authentication.expiresIn),
      });

      if (!token) {
        res.status(401).send({
          success: false,
          message: 'Token is not defined.',
        });
      } else {
        res.status(200).send({
          success: true,
          access_token: token,
          expiresIn: config.authentication.expiresIn,
          isAdmin: user.isAdmin,
          id: user.id,
        });
      }
    } catch (error) {
      next(error);
    }
  },
};
