const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Rols', {
    name:{
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  })
}