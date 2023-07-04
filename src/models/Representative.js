const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Representative', {
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: true,
    freezeTableName: true
  });
}