const { Model, DataTypes, Sequelize } = require("sequelize");

const sequelize = require("../config/connection");

class Instructions extends Model {}


Instructions.init(
  {
    recipe_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    step_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    instruction: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "instructions",
  }
);

// Export Post model
module.exports = Instructions;
