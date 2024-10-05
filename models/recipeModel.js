const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
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
  recipe_image: {
    type: String,
    required: true, // This field is required
  },
  author: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Recipe', recipeSchema);
