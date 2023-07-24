const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Califications', {
    B1: {
      type: DataTypes.ARRAY(DataTypes.ENUM(['A','B','C','D','E','F'])),
      allowNull: false,
      defaultValue: []
    },
    prom1:{
      type: DataTypes.ENUM(['A','B','C','D','E','F',' ']),
      allowNull: false,
      defaultValue: ' '
    },
    B2: {
      type: DataTypes.ARRAY(DataTypes.ENUM(['A','B','C','D','E','F'])),
      allowNull: false,
      defaultValue: []
    },
    prom2:{
      type: DataTypes.ARRAY(DataTypes.ENUM(['A','B','C','D','E','F',' '])),
      allowNull: false,
      defaultValue: ' '
    },
    B3: {
      type: DataTypes.ARRAY(DataTypes.ENUM(['A','B','C','D','E','F'])),
      allowNull: false,
      defaultValue: []
    },
    prom3:{
      type: DataTypes.ARRAY(DataTypes.ENUM(['A','B','C','D','E','F',' '])),
      allowNull: false,
      defaultValue: ' '
    },
    B4: {
      type: DataTypes.ARRAY(DataTypes.ENUM(['A','B','C','D','E','F'])),
      allowNull: false,
      defaultValue: []
    },
    prom4:{
      type: DataTypes.ARRAY(DataTypes.ENUM(['A','B','C','D','E','F',' '])),
      allowNull: false,
      defaultValue: ' '
    },
  },
  {
    freezeTableName: true,
    timestamps: true
  });
}