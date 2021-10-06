'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bug extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Bug.belongsTo(models.User);
    }
  };
  Bug.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    assignedTo: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      get() {
        return "open"
      }
    },
    priority: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: {
      type: DataTypes.DATE,
      get() {
        return new Date();
      }
    }
  }, {
    sequelize,
    modelName: 'Bug',
  });
  return Bug;
};