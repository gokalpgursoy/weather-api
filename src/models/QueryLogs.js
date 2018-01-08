/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'QueryLogs',
    {
      userId: DataTypes.INTEGER,
      locationId: DataTypes.INTEGER,
      ipAddress: DataTypes.STRING,
      response: DataTypes.STRING,
      time: DataTypes.STRING,
      isSuccess: DataTypes.STRING,
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
    },
    {
      tableName: 'QueryLogs',
    },
  );
};
