const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Schedules', {
    init: {
      type: DataTypes.STRING,
      allowNull: false
    },
    end: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },{
      freezeTableName: true,
      timestamps: true
  });
}