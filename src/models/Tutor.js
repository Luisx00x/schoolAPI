const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Tutor', {
    DNI: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    names: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    lastNames: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    timestamps: true,
    freezeTableName: true
  })
}