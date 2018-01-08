const queryLogsService = require('../services/queryLogsService');

module.exports = {
  async get(req, res, next) {
    try {
      const data = await queryLogsService.getByUserId(req.params.id);
      if (!data.success) {
        next(data.error);
      }
      res.send(data.logs);
    } catch (error) {
      next(error);
    }
  },
  async post(req, res, next) {
    try {
      req.body.ipAddress = req.connection.remoteAddress;
      const data = await queryLogsService.add(req.decoded.id, req.body);
      if (!data.success) {
        if (data.hasOwnProperty('message')) {
          res.status(500).send(data.message);
        }
        next(data.error);
      } else {
        res.send({
          success: data.success,
          message: 'Query log added successfully',
        });
      }
    } catch (error) {
      next(error);
    }
  },
};
