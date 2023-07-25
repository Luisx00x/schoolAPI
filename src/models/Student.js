const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Student',{
    DNI:{
      type: DataTypes.BIGINT,
      allowNull: true
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
    level: {
      type: DataTypes.ENUM(['Inicial','Primaria','Secundaria']),
      allowNull: false
    },
    grade: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sections:{
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
      defaultValue: []
    },
    gender: {
      type: DataTypes.ENUM(['M','F']),
      allowNull: false
    },
    religion:{
      type: DataTypes.STRING,
      allowNull: false
    },
    procedense: {
      type: DataTypes.STRING,
      allowNull: true
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