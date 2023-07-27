const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('ParentsReleases', {
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    timestamps: false,
    freezeTableName: false
  })
}