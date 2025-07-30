module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define('ingredient', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'ingredients', // Important if table is plural
    timestamps: false,
  });

  return Ingredient;
};
