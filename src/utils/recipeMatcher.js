import { RECIPES, SUBSTITUTIONS } from '../data/mockRecipes';

// *** FIX: Simplified Normalization to prevent pluralization bugs ***
// Only lowercase and remove leading/trailing spaces.
const normalizeIngredient = (name) => {
    return name.toLowerCase().trim();
};

// Core Recipe Matching Algorithm
export const getMatchingRecipes = (inputString, filters, favorites = []) => {
    // 1. Process User Input
    const userIngredients = inputString
        .split(',')
        .map(i => normalizeIngredient(i))
        .filter(i => i.length > 1);

    if (userIngredients.length === 0) return [];

    let matchedRecipes = RECIPES.map(recipe => {
        const requiredIngredients = recipe.ingredients.map(normalizeIngredient);
        let matchedCount = 0;
        let missingIngredients = [];
        let substitutionSuggestions = [];

        // Calculate Match Score
        requiredIngredients.forEach(reqIng => {
            const isInputPresent = userIngredients.includes(reqIng);

            if (isInputPresent) {
                matchedCount++;
            } else {
                let isSubstituted = false;
                
                // Check for substitutions
                // We check if any of the user's ingredients matches a substitution for the required ingredient
                for (const [key, subs] of Object.entries(SUBSTITUTIONS)) {
                    if (reqIng.includes(key) && userIngredients.some(uIng => subs.includes(uIng))) {
                         // Found a substitution (e.g., user has 'butter' for required 'oil')
                        substitutionSuggestions.push({ 
                            missing: reqIng, 
                            available: userIngredients.find(uIng => subs.includes(uIng)) // List the one they have
                        });
                        isSubstituted = true;
                        break; // Stop checking substitutions once one is found
                    }
                }
                
                if (!isSubstituted) {
                    missingIngredients.push(reqIng);
                }
            }
        });

        const matchScore = (matchedCount / requiredIngredients.length) * 100;
        const isFavorite = favorites.includes(recipe.id);

        return {
            ...recipe,
            matchScore: Math.round(matchScore),
            missingIngredients,
            substitutionSuggestions,
            isFavorite
        };
    });

    // 2. Filter Recipes
    // *** Set to 20% to ensure recipes show up even with minimal input ***
    matchedRecipes = matchedRecipes.filter(r => r.matchScore >= 20); 

    if (filters.dietary !== 'All') {
        matchedRecipes = matchedRecipes.filter(r => 
            r.dietary_restrictions.includes(filters.dietary)
        );
    }
    if (filters.difficulty !== 'All') {
        matchedRecipes = matchedRecipes.filter(r => r.difficulty === filters.difficulty);
    }
    if (filters.cookingTime !== 'All') {
        const maxTime = parseInt(filters.cookingTime.split(' ')[0]);
        matchedRecipes = matchedRecipes.filter(r => 
            parseInt(r.cooking_time.split(' ')[0]) <= maxTime
        );
    }

    // Sort by highest match score
    return matchedRecipes.sort((a, b) => b.matchScore - a.matchScore);
};