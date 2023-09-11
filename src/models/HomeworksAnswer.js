const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('HomeworksAnswer', {
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    calification: {
      type: DataTypes.ENUM(["A","B","C","D","E","F"]),
      allowNull: true
    }
  },
  {
    timestamps: true,
    freezeTableName: true
  })
}