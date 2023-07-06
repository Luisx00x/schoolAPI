const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Student',{
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fatherName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    motherName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    defaulter: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    timestamps: true,
    freezeTableName: true
  })
}