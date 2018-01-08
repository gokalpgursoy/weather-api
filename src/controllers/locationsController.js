const locationsService = require('../services/locationsService');

module.exports = {
  async get(req, res, next) {
    try {
      const data = await locationsService.getActives();
      if (!data.success) {
        next(data.error);
      }
      res.send(data.locations);
    } catch (error) {
      next(error);
    }
  },
  async post(req, res, next) {
    try {
      const data = await locationsService.add(req.body);
      if (!data.success) {
        if (data.hasOwnProperty('message')) {
          res.status(500).send(data.message);
        }
        next(data.error);
      } else {
        res.send({
          success: data.success,
          message: 'Location added successfully',
        });
      }
    } catch (error) {
      next(error);
    }
  },
  async put(req, res, next) {
    try {
      const data = await locationsService.update(req.body);
      if (!data.success) {
        if (data.hasOwnProperty('message')) {
          res.status(500).send(data.message);
        }
        next(data.error);
      }
      res.send({
        success: data.success,
        message: 'Location updated successfully',
      });
    } catch (error) {
      next(error);
    }
  },
  async delete(req, res, next) {
    try {
      const data = await locationsService.softDelete(req.body.id);
      if (!data.success) {
        if (data.hasOwnProperty('message')) {
          res.status(500).send(data.message);
        }
        next(data.error);
      }
      res.send({
        success: data.success,
        message: 'Location deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  },
};
