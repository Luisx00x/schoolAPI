const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Grade', {
    level: {
      type: DataTypes.ENUM(['Inicial','Primaria','Secundaria']),
      allowNull: false
    },
    grade: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    freezeTableName: true,
    timestamps: true
  })
}