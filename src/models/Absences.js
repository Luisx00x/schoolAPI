const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Absences', {
    absences: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    justifiedFault:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    delays:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  },
  {
    freezeTableName: true,
    timestamps: true
  })
}