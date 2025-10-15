import React, { useState } from 'react';
import { X, ChefHat, Info, Clock, Heart, Zap, Star } from 'lucide-react'; // Import Star

// Added new prop: onRate
const RecipeModal = ({ recipe, onClose, onSave, onRate }) => { 
  const [servingMultiplier, setServingMultiplier] = useState(1);

  if (!recipe) return null;

  const handleMultiplierChange = (e) => {
    const value = parseInt(e.target.value);
    setServingMultiplier(value > 0 ? value : 1);
  };

  const {
    name,
    ingredients,
    instructions,
    nutritional_info,
    missingIngredients,
    substitutionSuggestions,
    cooking_time,
    difficulty,
    dietary_restrictions,
    isFavorite,
    rating // Note: This rating is static mock data for display
  } = recipe;

  // Rating buttons logic
  const renderRatingButtons = () => {
    const stars = [1, 2, 3, 4, 5];
    return (
      <div className="flex items-center space-x-2">
        <span className="font-semibold text-gray-700">Rate this:</span>
        {stars.map((star) => (
          <button
            key={star}
            onClick={() => {
              onRate(recipe.id, star); // Call the new handler
            }}
            className="p-1 rounded-full hover:bg-yellow-100 transition"
            title={`Give this recipe ${star} stars`}
          >
            {/* Display a filled star for the user's current rating (or mock rating) */}
            <Star 
              size={20} 
              className={star <= (recipe.userRating || 0) ? "text-yellow-500 fill-yellow-500" : "text-gray-400"} 
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div 
        className="bg-white w-full max-w-3xl max-h-[90vh] rounded-xl shadow-2xl overflow-y-auto scrollbar-thin" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white p-5 border-b border-gray-200 z-10 flex justify-between items-center">
          <h2 className="text-3xl font-extrabold text-amber-600">{name}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition">
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Quick Info Bar */}
          <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
            <span className="flex items-center"><Clock size={16} className="text-amber-500 mr-1.5" /> {cooking_time}</span>
            <span className="flex items-center"><Zap size={16} className="text-blue-500 mr-1.5" /> {difficulty}</span>
            <span className="flex items-center"><ChefHat size={16} className="text-green-500 mr-1.5" /> {dietary_restrictions.join(', ')}</span>
            <span className="flex items-center"><Info size={16} className="text-purple-500 mr-1.5" /> {rating}/5 Stars (Mock)</span>
          </div>
          
          {/* New Rating and Save Row */}
          <div className="flex justify-between items-center mb-6 border-b pb-4">
              {renderRatingButtons()}
              <button
                  onClick={() => onSave(recipe.id)}
                  className="flex items-center px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition shadow-md"
                  title={isFavorite ? "Remove from Favorites" : "Save as Favorite"}
              >
                  <Heart size={18} className={isFavorite ? "fill-white mr-2" : "mr-2"} />
                  {isFavorite ? "Saved" : "Save Recipe"}
              </button>
          </div>

          {/* Serving Size Adjustment */}
          {/* ... (rest of the modal content is unchanged) ... */}
          <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <label htmlFor="servings" className="block text-lg font-bold text-gray-700 mb-2">
              Adjust Servings:
            </label>
            <input
              id="servings"
              type="number"
              value={servingMultiplier}
              onChange={handleMultiplierChange}
              min="1"
              className="p-2 border border-gray-300 rounded-md w-24 text-center"
            />
            <span className="ml-3 text-gray-600">x Original Serving</span>
          </div>

          {/* Ingredients Section */}
          <section className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">Ingredients</h3>
            <ul className="list-disc list-inside space-y-2">
              {ingredients.map((ing, index) => (
                <li key={index} className="text-gray-700">
                  <span className="font-semibold">{ing}</span> 
                  <span className="ml-2 text-sm text-gray-500">({servingMultiplier}x quantity)</span>
                </li>
              ))}
            </ul>

            {/* Missing and Substitution Info */}
            {missingIngredients.length > 0 && (
                <div className="mt-6 p-3 bg-red-100 border border-red-300 rounded-lg">
                    <h4 className="font-bold text-red-700">Missing Ingredients:</h4>
                    <p className="text-red-600 italic">{missingIngredients.join(', ')}</p>
                </div>
            )}

            {substitutionSuggestions.length > 0 && (
                <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
                    <h4 className="font-bold text-yellow-700">Substitution Suggestions (Near Match):</h4>
                    {substitutionSuggestions.map((sub, i) => (
                        <p key={i} className="text-yellow-600 text-sm">
                            Missing: **{sub.missing}** - Substitute with: **{sub.available}**
                        </p>
                    ))}
                </div>
            )}
          </section>

          {/* Instructions Section */}
          <section className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">Instructions</h3>
            <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">{instructions}</p>
          </section>

          {/* Nutritional Info Section */}
          <section>
            <h3 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">Nutritional Info (per {servingMultiplier} Serving(s))</h3>
            <p className="text-gray-700">
              <span className="font-bold text-lg text-green-700">{nutritional_info.calories * servingMultiplier}</span> Calories |
              <span className="font-bold text-lg text-blue-700"> {nutritional_info.protein * servingMultiplier}g</span> Protein
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;