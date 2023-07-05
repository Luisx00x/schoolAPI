const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('User', {
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "Creado",
    updatedAt: "Actualizado"
  });
};