const db = require('../models');

module.exports = {
  async getByUserId(id) {
    try {
      const logs = await db.sequelize.query(
        `select ql.id, u.username as username, l.title as locationTitle, ql.ipAddress, ql.response, ql.time, ql.isSuccess , ql.isDeleted
      from querylogs as ql 
      join users as u
      on ql.userId = u.id
      join locations as l
      on ql.locationId = l.id
      where ql.isDeleted = 0 and ql.userId=${id}
      order by ql.createdAt desc`,
        {
          type: db.sequelize.QueryTypes.SELECT,
        },
      );
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
