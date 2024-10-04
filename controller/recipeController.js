const Recipe = require('../models/recipeModel');
// const User = require("../models/userModel")


exports.createRecipe = async (req, res) => {
  try {
    const recipe_image = req?.file?.filename;

    // Check if the image is uploaded
    if (!recipe_image) {
      return res.status(400).json({
        success: false,
        message: "Recipe image is required",
      });
    }
    const { title, ingredients, instructions, cuisineType } = req.body;

    // Check if all required fields are present
    if (!title || !ingredients || !instructions || !cuisineType) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const recipe = new Recipe({
      recipe_image,
      title,
      ingredients,
      instructions,
      cuisineType,

    });

    const savedRecipe = await recipe.save();

    res.status(201).json({
      success: true,
      message: "Recipe created successfully!",
      recipe: savedRecipe,
    });
  } catch (error) {
    console.error("Error creating recipe", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find() // Populate the author's name and email
        res.status(200).json({
            success: true,
            recipes,
        });
    } catch (error) {
        console.error("Error fetching recipes", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


exports.getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id)
        if (!recipe) {
            return res.status(404).json({ success: false, message: "Recipe not found" });
        }

        res.status(200).json({
            success: true,
            recipe,
        });
    } catch (error) {
        console.error("Error fetching recipe", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


exports.updateRecipe = async (req, res) => {
    try {
        // Extract the recipe image, if it exists
        const recipe_image = req.file ? req.file.filename : null;
        const { title, ingredients, instructions, cuisineType } = req.body;

        // Create an object to hold the updated fields
        const updatedData = {
            title,
            ingredients,
            instructions,
            cuisineType,
        };

        // If there's a new image, add it to the update data
        if (recipe_image) {
            updatedData.recipe_image = recipe_image;
        }

        // Update the recipe using `findByIdAndUpdate`
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true, runValidators: true } // Returns the updated document
        );

        // If the recipe was found and updated, return the updated recipe
        if (updatedRecipe) {
            return res.status(200).json({
                success: true,
                message: "Recipe updated successfully",
                data: updatedRecipe, // Return the updated recipe data
            });
        } else {
            // If the recipe was not found, return a 404 error
            return res.status(404).json({
                success: false,
                message: "Recipe not found",
            });
        }
    } catch (err) {
        // Handle any server errors
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: err.message,
        });
    }
};

exports.deleteRecipe = async (req, res) => {
    try {
        const recipeId = req.params.id;

        // Find the recipe by ID
        const recipe = await Recipe.findById(recipeId);

        // Check if the recipe exists
        if (!recipe) {
            return res.status(404).json({ success: false, message: "Recipe not found" });
        }

        // Optional: Check if the user is authorized to delete this recipe
        // Uncomment this part if you want to restrict deletion to the author only
        // if (recipe.author.toString() !== req.user._id.toString()) {
        //     return res.status(403).json({ success: false, message: "You are not authorized to delete this recipe" });
        // }

        // Use deleteOne to remove the recipe from the database
        await Recipe.deleteOne({ _id: recipeId });

        res.status(200).json({ success: true, message: "Recipe deleted successfully!" });
    } catch (error) {
        console.error("Error deleting recipe", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

