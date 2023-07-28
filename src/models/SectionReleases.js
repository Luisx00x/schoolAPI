const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('SectionReleases', {
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    sender: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    timestamp: true,
    freezeTableName: true
  })
}