const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Student',{
    fatherName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    motherName: {
      type: DataTypes.STRING,
      allowNull: false
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