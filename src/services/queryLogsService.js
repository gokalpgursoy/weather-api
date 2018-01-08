const queryLogsModel = require('../models').QueryLogs;

module.exports = {
  async getByUserId(id) {
    try {
      const logs = await queryLogsModel.findAll({
        where: {
          userId: id,
          isDeleted: 0,
        },
        order: [['updatedAt', 'DESC']],
      });
      return {
        success: true,
        logs,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  },
  async add(userId, data) {
    try {
      if (
        !userId ||
        !data.hasOwnProperty('locationId') ||
        !data.hasOwnProperty('response') ||
        !data.hasOwnProperty('time') ||
        !data.hasOwnProperty('isSuccess')
      ) {
        return {
          success: false,
          message: 'Parameters is not valid',
        };
      }
      const queryLog = {
        userId,
        locationId: data.locationId,
        ipAddress: data.ipAddress,
        response: data.response,
        time: data.time,
        isSuccess: data.isSuccess,
      };
      await queryLogsModel.create(queryLog);
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
