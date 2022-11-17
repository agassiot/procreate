const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');



class Tree extends Model {}

Tree.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nameX: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nameY: {
      type: DataTypes.STRING,
      allowNull: false
    },
    famId: {
      type: DataTypes.STRING,
      allowNull: false
    },
      user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      },
    }
   
    
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tree'
  }
);

module.exports = Tree;
