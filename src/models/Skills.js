const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Skills', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    grade: {
      type: DataTypes.ENUM(['A','B','C','D','E','F']),
      allowNull: false
    }
  },
  {
    freezeTableName: true,
    timestamps: true
  });
}