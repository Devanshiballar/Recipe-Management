const mongoose = require('mongoose');

// Define the Recipe schema
const recipeSchema = new mongoose.Schema(
  {
    recipe_image: {
        type: String,
        required: true, 
    },
    title: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String], 
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    cuisineType: {
      type: String,
      required: true,
    },
    // author: {
    //   type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    //   ref: 'User',
    //   required: true,
    // },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Recipe', recipeSchema);
