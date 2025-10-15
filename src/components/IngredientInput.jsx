import React, { useState } from 'react';

// --- Real API Integration Logic (Frontend Side) ---
const scanImageForIngredients = async (imageFile) => {
    // 1. Convert the image file to a Base64 string for transmission
    const base64Image = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        // Read the file and get the base64 content after the MIME type prefix (e.g., 'data:image/jpeg;base64,')
        reader.onload = () => resolve(reader.result.split(',')[1]); 
        reader.onerror = error => reject(error);
        reader.readAsDataURL(imageFile);
    });

    // 2. Call the Serverless Function (Vercel API endpoint)
    // The path is simple because Vercel handles the routing for /api/
    const response = await fetch('/api/scan-image', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: base64Image }),
    });

    if (!response.ok) {
        // This handles errors from the serverless function itself
        const errorData = await response.json();
        throw new Error(`Image scanning failed: ${errorData.error || response.statusText}`);
    }

    // 3. The serverless function returns the clean ingredient string
    const data = await response.json();
    
    // Return the comma-separated string for the existing recipe matching logic
    return data.ingredientsString; 
};
// ----------------------------------------------------


const IngredientInput = ({ onSearch, isLoading }) => {
  const [textInput, setTextInput] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false);

  // Handles text input submission
  const handleTextSubmit = (e) => {
    e.preventDefault();
    onSearch(textInput);
  };

  // Handles image submission
  const handleImageSubmit = async () => {
    if (!imageFile) return;

    setIsImageLoading(true);
    try {
      // 1. Scan the image via the serverless API
      const detectedIngredients = await scanImageForIngredients(imageFile);
      
      // 2. Set the detected ingredients back into the text input area
      setTextInput(detectedIngredients);
      
      // 3. Run the search on the detected string
      onSearch(detectedIngredients); 
      
    } catch (error) {
      console.error("Image recognition failed:", error.message);
      alert(`Image recognition failed: ${error.message}. Please try text input.`);
    } finally {
      setIsImageLoading(false);
    }
  };

  return (
    <div className="mb-8 p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Input Ingredients</h2>

      {/* --- 1. Text Input Section --- */}
      <form onSubmit={handleTextSubmit} className="mb-6 border-b pb-6 border-gray-200">
        <label htmlFor="text-input" className="block text-lg font-semibold text-gray-800 mb-2">
          Option A: Enter Manually 📝
        </label>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            id="text-input"
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="e.g., chicken, onion, tomato, pasta, garlic"
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 transition duration-150"
            disabled={isLoading || isImageLoading}
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-700 transition duration-300 shadow-md disabled:bg-gray-400"
            disabled={isLoading || isImageLoading}
          >
            Find Recipes
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">Separate ingredients with commas.</p>
      </form>

      {/* --- 2. Image Input Section --- */}
      <div>
        <label htmlFor="image-input" className="block text-lg font-semibold text-gray-800 mb-2">
          Option B: Scan Ingredients 📸
        </label>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-start sm:items-center">
          <input
            id="image-input"
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="flex-grow p-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200"
            disabled={isLoading || isImageLoading}
          />
          <button
            onClick={handleImageSubmit}
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300 shadow-md disabled:bg-gray-400"
            disabled={!imageFile || isLoading || isImageLoading}
          >
            {isImageLoading ? (
              <span className="flex items-center">
                Scanning...
                <svg className="animate-spin h-5 w-5 ml-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
            ) : (
              'Process Image'
            )}
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">Upload a photo of your available ingredients.</p>
      </div>
    </div>
  );
};

export default IngredientInput;