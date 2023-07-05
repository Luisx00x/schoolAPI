const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Administration', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    freezeTableName: true,
    timestamps: true
  });
}