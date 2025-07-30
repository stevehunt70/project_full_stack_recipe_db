module.exports = (sequelize, DataTypes) => {
  const RecipeIngredient = sequelize.define('RecipeIngredient', {
    recipe_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ingredient_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.STRING, // Use STRING for fractions like "1 and 3/4"
      allowNull: true,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'recipe_ingredients',
    timestamps: false
  });

  return RecipeIngredient;
};
