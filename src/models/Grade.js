const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Grade', {
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