import React, { useState, useEffect, useMemo } from 'react'; // Added useMemo
import Header from './components/Header';
import IngredientInput from './components/IngredientInput';
import Filters from './components/Filters';
import RecipeCard from './components/RecipeCard';
import RecipeModal from './components/Modal';
import { getMatchingRecipes } from './utils/recipeMatcher';
import { RECIPES } from './data/mockRecipes'; // Import RECIPES for suggestion logic

// New component for displaying suggestions
const Suggestions = ({ favoriteRecipes }) => {
    if (favoriteRecipes.length === 0) return null;

    // Simple suggestion logic: Recommend other easy/medium recipes
    const suggestions = RECIPES
        .filter(r => !favoriteRecipes.some(fav => fav.id === r.id) && (r.difficulty === 'Easy' || r.difficulty === 'Medium'))
        .slice(0, 3); // Take top 3 non-favorite easy/medium recipes

    if (suggestions.length === 0) return null;

    return (
        <div className="mb-10 p-6 bg-blue-50 border-l-4 border-blue-400 rounded-lg shadow-inner">
            <h3 className="text-xl font-bold text-blue-800 mb-4">★ Personalized Suggestions ★</h3>
            <p className="text-gray-700 mb-4">Based on your saved recipes, here are some meals you might enjoy:</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {suggestions.map(recipe => (
                    <div key={recipe.id} className="p-3 bg-white rounded-lg shadow text-sm">
                        <p className="font-semibold text-gray-800">{recipe.name}</p>
                        <p className="text-xs text-gray-600">Difficulty: {recipe.difficulty}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};


function App() {
  const [recipes, setRecipes] = useState([]);
  const [filters, setFilters] = useState({ dietary: 'All', difficulty: 'All', cookingTime: 'All' });
  const [inputIngredients, setInputIngredients] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [favorites, setFavorites] = useState([]); // Stores recipe IDs
  const [userRatings, setUserRatings] = useState({}); // Stores { recipeId: rating }

  // Load state from local storage on mount
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('recipeFavorites')) || [];
    const savedRatings = JSON.parse(localStorage.getItem('userRatings')) || {};
    setFavorites(savedFavorites);
    setUserRatings(savedRatings);
    
    const previousInput = localStorage.getItem('lastInput');
    if (previousInput) {
        handleSearch(previousInput, filters, savedFavorites);
    }
  }, []);

  // Effect to re-run matching whenever filters change
  useEffect(() => {
    if (inputIngredients) {
      handleSearch(inputIngredients, filters, favorites);
    }
  }, [filters]);

  // Handle Recipe Search (Simulated API call)
  const handleSearch = (input, currentFilters = filters, currentFavorites = favorites) => {
    setIsLoading(true);
    setInputIngredients(input);
    localStorage.setItem('lastInput', input);
    
    setTimeout(() => {
      const results = getMatchingRecipes(input, currentFilters, currentFavorites).map(r => ({
          ...r,
          userRating: userRatings[r.id] || 0 // Merge user rating for display
      }));
      setRecipes(results);
      setIsLoading(false);
    }, 500);
  };

  // Handle Saving/Unsaving a Recipe
  const handleSaveRecipe = (id) => {
    setFavorites(prev => {
      let newFavorites;
      const isCurrentlyFavorite = prev.includes(id);

      if (isCurrentlyFavorite) {
        newFavorites = prev.filter(favId => favId !== id); 
      } else {
        newFavorites = [...prev, id]; 
      }
      localStorage.setItem('recipeFavorites', JSON.stringify(newFavorites));
      
      // Update states
      const updatedRecipes = recipes.map(r => 
        r.id === id ? { ...r, isFavorite: !isCurrentlyFavorite } : r
      );
      setRecipes(updatedRecipes);
      
      if (selectedRecipe && selectedRecipe.id === id) {
          setSelectedRecipe(prev => ({ ...prev, isFavorite: !isCurrentlyFavorite }));
      }
      
      return newFavorites;
    });
  };

  // Handle User Rating
  const handleRateRecipe = (id, rating) => {
    setUserRatings(prev => {
        const newRatings = { ...prev, [id]: rating };
        localStorage.setItem('userRatings', JSON.stringify(newRatings));
        
        // Update states to reflect new rating immediately
        setRecipes(currentRecipes => currentRecipes.map(r => 
            r.id === id ? { ...r, userRating: rating } : r
        ));
        
        if (selectedRecipe && selectedRecipe.id === id) {
             setSelectedRecipe(prev => ({ ...prev, userRating: rating }));
        }
        
        return newRatings;
    });
  };

  // Use useMemo to filter the full recipe list down to just the favorited recipes
  const favoriteRecipes = useMemo(() => {
    return RECIPES.filter(r => favorites.includes(r.id));
  }, [favorites]);


  return (
    <div className="min-h-screen bg-gray-50 font-sans scrollbar-thin">
      <Header />

      <main className="max-w-6xl mx-auto p-4 md:p-8">
        <IngredientInput onSearch={(input) => handleSearch(input, filters, favorites)} isLoading={isLoading} />
        
        <Filters filters={filters} setFilters={setFilters} />

        {/* Recipe Suggestions Feature */}
        <Suggestions favoriteRecipes={favoriteRecipes} />

        {/* Results Display */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          {isLoading ? 'Searching...' : (
            inputIngredients ? 
              `${recipes.length} Recipe Matches Found` : 
              'Enter ingredients to start generating recipes'
          )}
        </h2>

        {isLoading && (
          <p className="text-center text-lg text-gray-500 mt-10">Searching the database for the best meals... 🧑‍🍳</p>
        )}

        {!isLoading && recipes.length === 0 && inputIngredients && (
          <div className="text-center p-10 bg-red-50 border border-red-200 rounded-lg mt-10">
            <h3 className="text-xl font-semibold text-red-700">No Recipes Found 😔</h3>
            <p className="text-red-600 mt-2">Try adding more ingredients or adjusting your filters. (Minimum 20% match required.)</p>
          </div>
        )}

        {!isLoading && recipes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map(recipe => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe} 
                onSave={handleSaveRecipe}
                onOpen={setSelectedRecipe}
              />
            ))}
          </div>
        )}
      </main>
      
      {/* Recipe Modal */}
      <RecipeModal 
        recipe={selectedRecipe} 
        onClose={() => setSelectedRecipe(null)} 
        onSave={handleSaveRecipe}
        onRate={handleRateRecipe}
      />
    </div>
  );
}

export default App;