const { DataTypes, STRING } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Attendance', {
    justifiedFault:{
      type: DataTypes.ARRAY(DataTypes.ENUM(['A','B','C','D','E','F',' '])),
      allowNull: true,
    },
    absences:{
      type: DataTypes.ARRAY(DataTypes.ENUM(['A','B','C','D','E','F',' '])),
      allowNull: true,
    },
    delays
    :{
      type: DataTypes.ARRAY(DataTypes.ENUM(['A','B','C','D','E','F',' '])),
      allowNull: true,
    },
  },
  {
    timestaps: true,
    freezeTableName: true
  })
}