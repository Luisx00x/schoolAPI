const { DataTypes } = require('sequelize');

module.exports = sequelieze => {
  sequelieze.define('StudentReleases',{
    title:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    location:{
      type: DataTypes.TEXT,
      allowNull: false
    },
  },
  {
    timestamps: true,
    freezeTableName:true
  })
}