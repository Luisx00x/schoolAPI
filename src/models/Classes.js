const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Classes', {
    className: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  })
}