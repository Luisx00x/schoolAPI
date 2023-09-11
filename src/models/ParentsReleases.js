const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('ParentsReleases', {
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    studentId:{
      type: DataTypes.INTEGER,
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