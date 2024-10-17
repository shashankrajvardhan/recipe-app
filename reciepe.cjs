const {pool} = require('./database.cjs'); 
const createRecipe = async (name, description, icon) => {
  const query = `
  INSERT INTO recipe (name, description, icon)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;
  try {
    const result = await pool.query(query, [name, description, icon]);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating recipe:', error);
    throw error;
  }
};

const getAllRecipes = async () => {
  const query = `SELECT * FROM recipe;`;
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

const updateRecipe = async (id, name, description, icon) => {
  const query = `
  UPDATE recipe
  SET name = $2, description = $3, icon = $4, updated_at = CURRENT_TIMESTAMP
  WHERE id = $1
  RETURNING *;
  `;
  try {
    const result = await pool.query(query, [id, name, description, icon]);
    return result.rows[0];
  } catch (error) {
    console.error('Error updating recipe:', error);
    throw error;
  }
};

const deleteRecipe = async (id) => {
  const query = `DELETE FROM recipe WHERE id = $1;`;
  try {
    await pool.query(query, [id]);
    console.log('Recipe deleted with id:', id);
  } catch (error) {
    console.error('Error deleting recipe:', error);
    throw error;
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  updateRecipe,
  deleteRecipe,
}