const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Califications', {
    B1: {
      type: DataTypes.ARRAY(DataTypes.ENUM(['A','B','C','D','E','F'])),
      allowNull: true
    },
    prom1:{
      type: DataTypes.ENUM(['A','B','C','D','E','F',' ']),
      allowNull: true,
      defaultValue: ' '
    },
    B2: {
      type: DataTypes.ARRAY(DataTypes.ENUM(['A','B','C','D','E','F'])),
      allowNull: true
    },
    prom2:{
      type: DataTypes.ENUM(['A','B','C','D','E','F',' ']),
      allowNull: true,
      defaultValue: ' '
    },
    B3: {
      type: DataTypes.ARRAY(DataTypes.ENUM(['A','B','C','D','E','F'])),
      allowNull: true
    },
    prom3:{
      type: DataTypes.ENUM(['A','B','C','D','E','F',' ']),
      allowNull: true,
      defaultValue: ' '
    },
    B4: {
      type: DataTypes.ARRAY(DataTypes.ENUM(['A','B','C','D','E','F'])),
      allowNull: true
    },
    prom4:{
      type: DataTypes.ENUM(['A','B','C','D','E','F',' ']),
      allowNull: true,
      defaultValue: ' '
    },
  },
  {
    freezeTableName: true,
    timestamps: true
  });
}