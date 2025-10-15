Smart Recipe Generator
Features

1. Scanning Ingredients (In Progress) 🚧
The app converts a user-uploaded image to a Base64 string and sends it to the /api/scan-image function. This endpoint uses the Hugging Face Inference API to run an image classification model. The model identifies ingredients (e.g., "tomato," "chicken") and the function filters the results by confidence score to generate a clean, concise list of available items.
________________________________________
2. Recipe Matching Logic ✅
The core feature is database matching, not AI generation. The ingredient list (from the scan or manual entry) is compared against a predefined database of recipes.
The system calculates a match percentage (e.g., ) for every stored recipe. Only recipes achieving a 20% match threshold or higher are displayed.
The system then retrieves all associated, pre-stored data for these matched recipes, including:
•	Missing Ingredients
•	Time Duration, Calories, and Protein
•	Categorization (Veg, Gluten-Free, Duration, Difficulty)
•	User-specific features like Saving and Rating.
This ensures fast, accurate, and consistent results, prioritizing existing, validated recipes.
