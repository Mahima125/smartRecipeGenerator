import React from 'react';
import { Heart, Clock, Star, Zap } from 'lucide-react';

const RecipeCard = ({ recipe, onSave, onOpen, servingMultiplier }) => {
  const { 
    name, 
    matchScore, 
    cooking_time, 
    difficulty, 
    nutritional_info, 
    isFavorite, 
    rating 
  } = recipe;

  return (
    <div 
      className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer flex flex-col"
      onClick={() => onOpen(recipe)}
    >
      <div className="p-5 flex-1">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-800 leading-snug">{name}</h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSave(recipe.id);
            }}
            className="p-2 rounded-full transition duration-150 hover:bg-red-100"
            title={isFavorite ? "Remove from Favorites" : "Save as Favorite"}
          >
            <Heart size={24} className={isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"} />
          </button>
        </div>

        {/* Match Score */}
        <div className="text-center bg-green-500 text-white font-extrabold py-1.5 rounded-full mb-4 w-28 text-sm">
          {matchScore}% Match
        </div>

        {/* Recipe Info */}
        <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-600">
          <div className="flex items-center">
            <Clock size={16} className="text-amber-500 mr-2" />
            Time: <span className="font-semibold ml-1">{cooking_time}</span>
          </div>
          <div className="flex items-center">
            <Zap size={16} className="text-blue-500 mr-2" />
            Difficulty: <span className="font-semibold ml-1">{difficulty}</span>
          </div>
          <div className="flex items-center">
            <Star size={16} className="text-yellow-500 fill-yellow-500 mr-2" />
            Rating: <span className="font-semibold ml-1">{rating}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold text-gray-800">{nutritional_info.calories * servingMultiplier}</span> Cal / Serving
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;