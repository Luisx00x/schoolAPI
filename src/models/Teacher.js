const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Teacher', {
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    freezeTableName: true,
    timestamps: true
  });
}