const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Absences', {
    absences: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    freezeTableName: true,
    timestamps: true
  })
}