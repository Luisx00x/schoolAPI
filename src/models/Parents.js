const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Parents', {
    DNI: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false
    },
    names: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastNames: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    civilStatus: {
      type: DataTypes.STRING,
      allowNull: false
    },
    celPhone: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    workPlace: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ocuppation: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    RPMorRPC: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    freezeTableName: true,
    timestamps: true
  })
}