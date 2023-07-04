const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Homework',{
    asignation: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    file: {
      type: DataTypes.BLOB,
      allowNull: true
    }
  },
  {
    freezeTableName: true,
    timestamps: true
  })
}