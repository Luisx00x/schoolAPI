const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Student',{
    DNI:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fatherLastName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    motherLastName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    names: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    gender: {
      type: DataTypes.ENUM(['M','F']),
      allowNull: false
    },
    grade: {
      type: DataTypes.STRING,
      allowNull: false
    },
    religion:{
      type: DataTypes.STRING,
      allowNull: false
    },
    prosedence: {
      type: DataTypes.STRING,
      allowNull: false
    },
    defaulter: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    isActive : {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    timestamps: true,
    freezeTableName: true
  })
}