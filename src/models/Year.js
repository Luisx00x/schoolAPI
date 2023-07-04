const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Year', {
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    freezeTableName: true,
    timestamps: true
  });
}