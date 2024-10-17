const {Pool} = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'recipe',
  password: '12345',
  port: '5432',
});
module.exports = { pool };

const createRecipeTable = async() => {
  const query = `
  CREATE TABLE IF NOT EXISTS recipe (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  icon VARCHAR,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  `;

  try {
    await pool.query(query);
    console.log('Recipe table created successfully');
  } catch (error) {
    console.error('Error creating Recipe table', error);
  }
};

const createIngredientsTable = async() => {
  const query = `
  CREATE TABLE IF NOT EXISTS ingredients (
  id SERIAL PRIMARY KEY,
  recipe_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  icon VARCHAR,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_recipe
      FOREIGN KEY (recipe_id)
      REFERENCES recipe(id)
      ON DELETE CASCADE
  )
  `;

  try {
    await pool.query(query);
    console.log('Ingredients table created successfully');
  } catch (error) {
    console.error('Error creating Ingredients Table', error);
  }
};

const createStepsTable = async () => {
  const query = `
  CREATE TABLE IF NOT EXISTS steps (
    id SERIAL PRIMARY KEY,
    recipe_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_recipe
      FOREIGN KEY (recipe_id)
      REFERENCES recipe(id)
      ON DELETE CASCADE
  );
  `;

  try {
    await pool.query(query);
    console.log('Steps table created successfully');
  } catch (error) {
    console.error('Error creating Steps table', error);
  }
};

const initDatabase = async () => {
  await createRecipeTable();
  await createIngredientsTable();
  await createStepsTable();
};

module.exports = {
  initDatabase,
};