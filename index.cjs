const express = require('express');
const bodyParser = require('body-parser');
const {initDatabase} = require('./database.cjs');
const {createRecipe, getAllRecipes, updateRecipe, deleteRecipe} = require('./reciepe.cjs');
const { createIngredient, getIngredientsByRecipeId, updateIngredient, deleteIngredient } = require('./ingredients.cjs');
const { createStep, getStepsByRecipeId, updateStep, deleteStep } = require('./steps.cjs');
const app = express();
app.use(bodyParser.json());

initDatabase().then(() => {
  console.log('Database initialized');
}).catch((error) => {
  console.error('Failed to initialize database', error);
});

app.post('/recipes', async (req, res) => {
  const { name, description, icon } = req.body;
  try {
    const newRecipe = await createRecipe(name, description, icon);
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/recipes', async (req, res) => {
  try {
    const recipes = await getAllRecipes();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/recipes/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, icon } = req.body;
  try {
    const updatedRecipe = await updateRecipe(id, name, description, icon);
    if (updatedRecipe) {
      res.json(updatedRecipe);
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/recipes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deleteRecipe(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/ingredients', async (req, res) => {
  const { recipe_id, name, icon } = req.body;
  try {
    const newIngredient = await createIngredient(recipe_id, name, icon);
    res.status(201).json(newIngredient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/ingredients/:recipe_id', async (req, res) => {
  const { recipe_id } = req.params;
  try {
    const ingredients = await getIngredientsByRecipeId(recipe_id);
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/ingredients/:id', async (req, res) => {
  const { id } = req.params;
  const { name, icon } = req.body;
  try {
    const updatedIngredient = await updateIngredient(id, name, icon);
    res.json(updatedIngredient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/ingredients/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deleteIngredient(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/steps', async (req, res) => {
  const { recipe_id, title, description } = req.body;
  try {
    const newStep = await createStep(recipe_id, title, description);
    res.status(201).json(newStep);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/steps/:recipe_id', async (req, res) => {
  const { recipe_id } = req.params;
  try {
    const steps = await getStepsByRecipeId(recipe_id);
    res.json(steps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/steps/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const updatedStep = await updateStep(id, title, description);
    res.json(updatedStep);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/steps/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deleteStep(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});