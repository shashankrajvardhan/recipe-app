const {pool} = require('./database.cjs');
const createStep = async (recipe_id, title, description) => {
  const query = `
  INSERT INTO steps (recipe_id, title, description)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;
  try {
    const result = await pool.query(query, [recipe_id, title, description]);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating step:', error);
    throw error;
  }
};

const getStepsByRecipeId = async (recipe_id) => {
  const query = `SELECT * FROM steps WHERE recipe_id = $1;`;
  try {
    const result = await pool.query(query, [recipe_id]);
    return result.rows;
  } catch (error) {
    console.error('Error fetching steps:', error);
    throw error;
  }
};

const updateStep = async (id, title, description) => {
  const query = `
  UPDATE steps
  SET title = $2, description = $3, updated_at = CURRENT_TIMESTAMP
  WHERE id = $1
  RETURNING *;
  `;
  try {
    const result = await pool.query(query, [id, title, description]);
    return result.rows[0];
  } catch (error) {
    console.error('Error updating step:', error);
    throw error;
  }
};

const deleteStep = async (id) => {
  const query = `DELETE FROM steps WHERE id = $1;`;
  try {
    await pool.query(query, [id]);
    console.log('Step deleted with id:', id);
  } catch (error) {
    console.error('Error deleting step:', error);
    throw error;
  }
};

module.exports = {
  createStep,
  getStepsByRecipeId,
  updateStep,
  deleteStep,
};