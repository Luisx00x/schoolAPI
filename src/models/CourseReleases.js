const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('CourseReleases',{
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    sender:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    timestamps: true,
    freezeTableName: false
  })
}