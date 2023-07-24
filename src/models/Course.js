const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Course', {
    courseName:{
      type: DataTypes.STRING,
      allowNull: false
    },
    skills:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: []
    }
  },
  {
    freezeTableName: true,
    timestamps: true
  })
}