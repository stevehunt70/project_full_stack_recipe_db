// models/instructions.js
module.exports = (sequelize, DataTypes) => {
  const Instructions = sequelize.define(
    "instruction",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      step_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      instruction: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      recipe_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "instructions",
      timestamps: false,
    }
  );

  return Instructions;
};
