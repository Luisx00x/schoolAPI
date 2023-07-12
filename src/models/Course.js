const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Course', {
    courseName:{
      type: DataTypes.STRING,
      allowNull: false
    },
    init: {
      type: DataTypes.STRING,
      allowNull: false
    },
    end: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    freezeTableName: true,
    timestamps: true
  })
}