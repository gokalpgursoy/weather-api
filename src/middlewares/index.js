const jwt = require('jsonwebtoken');
const config = require('../config');
const usersModel = require('../models').Users;

module.exports = {
  async decodeToken(req, res, next) {
    try {
      let token = null;
      if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
      ) {
        /*eslint-disable*/
        token = req.headers.authorization.split(' ')[1];
      }
      if (token) {
        jwt.verify(
          token,
          'secretprivatekey',
          async (err, decoded) => {
            if (err) {
              return res.status(401).send({
                success: false,
                message: 'Failed to authenticate token.',
              });
            }
            const usr = await usersModel.find({
              where: {
                id: decoded.id,
                isDeleted: 0,
              },
            });
            if (!usr) {
              return res.status(401).send({
                success: false,
                message: 'Failed to authenticate token.',
              });
            }
            req.decoded = decoded;
            next();
          },
        );
      } else {
        return res.status(403).send({
          success: false,
          message: 'Token is not valid.',
        });
      }
    } catch (error) {
      return res.status(401).send({
        message: 'Auth failed',
      });
    }
  },
  async isUserAdmin(req, res, next) {
    try {
      const userId = req.decoded.id;
      const usr = await usersModel.find({
        where: {
          id: userId,
        },
      });
      if (usr.isAdmin !== true) {
        return res.status(500).send({
          success: false,
          message: 'Access denied.',
        });
      }
      next();
    } catch (error) {
      return res.status(401).send({
        message: 'Auth failed',
      });
    }
  },
};
