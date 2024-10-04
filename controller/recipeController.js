const Recipe = require("../models/recipeModel")

exports.createRecipe = async (req, res) => {
    try {
      const recipe_image = req?.file?.filename;
  
      if (!recipe_image) {
        return res.status(400).json({
          success: false,
          message: "Recipe image is required",
        });
      }
  
      const { title, ingredients, instructions, cuisineType } = req.body;
  
      if (!title || !ingredients || !instructions || !cuisineType) {
        return res.status(400).json({ success: false, message: "All fields are required" });
      }
  
      const recipe = new Recipe({
        recipe_image,
        title,
        ingredients,
        instructions,
        cuisineType,
        author: req.user._id 
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
        const recipes = await Recipe.find()
            .populate('author', 'username email') 
            .exec();

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
            .populate('author', 'username email') 
            .exec();

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

        const recipe_image = req.file ? req.file.filename : null;
        const { title, ingredients, instructions, cuisineType } = req.body;

        const updatedData = {
            title,
            ingredients,
            instructions,
            cuisineType,
        };

        if (recipe_image) {
            updatedData.recipe_image = recipe_image;
        }

        const updatedRecipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true, runValidators: true } 
        );

        if (updatedRecipe) {
            return res.status(200).json({
                success: true,
                message: "Recipe updated successfully",
                data: updatedRecipe,
            });
        } else {
      
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

        const recipe = await Recipe.findById(recipeId);

        if (!recipe) {
            return res.status(404).json({ success: false, message: "Recipe not found" });
        }

        await Recipe.deleteOne({ _id: recipeId });

        res.status(200).json({ success: true, message: "Recipe deleted successfully!" });
    } catch (error) {
        console.error("Error deleting recipe", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

