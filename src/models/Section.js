const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Section', {
    sectionName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    freezeTableName: true,
    timestamps: true
  })
}