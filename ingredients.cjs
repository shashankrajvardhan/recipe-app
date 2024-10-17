const {pool} = require('./database.cjs');
const createIngredient = async (recipe_id, name, icon) => {
  const query = `
  INSERT INTO ingredients (recipe_id, name, icon)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;
  try {
    const result = await pool.query(query, [recipe_id, name, icon]);
    console.log('Ingredient created:', result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating ingredient:', error);
    throw error;
  }
};

const getIngredientsByRecipeId = async (recipe_id) => {
  const query = `SELECT * FROM ingredients WHERE recipe_id = $1;`;
  try {
    const result = await pool.query(query, [recipe_id]);
    return result.rows;
  } catch (error) {
    console.error('Error fetching ingredients:', error);
    throw error;
  }
};

const updateIngredient = async (id, name, icon) => {
  const query = `
  UPDATE ingredients
  SET name = $2, icon = $3, updated_at = CURRENT_TIMESTAMP
  WHERE id = $1
  RETURNING *;
  `;
  try {
    const result = await pool.query(query, [id, name, icon]);
    return result.rows[0];
  } catch (error) {
    console.error('Error updating ingredient:', error);
    throw error;
  }
};

const deleteIngredient = async (id) => {
  const query = `DELETE FROM ingredients WHERE id = $1;`;
  try {
    await pool.query(query, [id]);
    console.log('Ingredient deleted with id:', id);
  } catch (error) {
    console.error('Error deleting ingredient:', error);
    throw error;
  }
};

module.exports = {
  createIngredient,
  getIngredientsByRecipeId,
  updateIngredient,
  deleteIngredient,
}