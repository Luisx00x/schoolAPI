const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Homework',{
    asignation: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    freezeTableName: true,
    timestamps: true
  })
}