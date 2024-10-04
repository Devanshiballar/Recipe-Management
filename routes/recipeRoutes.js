const express = require('express');
const router = express.Router();
const { createRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe } = require('../controller/recipeController');
const upload = require("../util/fileUpload");
const { IsUser, authenticate } = require('../middleware/authenticate ');

router.post("/recipe", upload.single("recipe_image"),authenticate,IsUser, createRecipe);
router.get('/recipe',getAllRecipes);
router.get('/recipe/:id',getRecipeById);
router.delete('/recipe/:id',authenticate,IsUser, deleteRecipe);
router.patch('/recipe/:id',upload.single("recipe_image"),authenticate,IsUser, updateRecipe);

module.exports = router;
