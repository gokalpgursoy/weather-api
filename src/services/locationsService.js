const locationsModel = require('../models').Locations;

module.exports = {
  async getActives() {
    try {
      const locations = await locationsModel.findAll({
        where: {
          isDeleted: 0,
        },
      });
      return {
        success: true,
        locations,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  },
  async add(data) {
    try {
      if (!data.title) {
        return {
          success: false,
          message: 'Parameter is not valid',
        };
      }
      const location = {
        title: data.title,
      };
      await locationsModel.create(location);
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
  async update(data) {
    try {
      if (!data.id || !parseInt(data.id)) {
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
      await locationsModel.update(updatedValues, {
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
  async softDelete(id) {
    try {
      if (!parseInt(id)) {
        return {
          success: false,
          message: 'Parameter is not valid',
        };
      }
      await locationsModel.update(
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
