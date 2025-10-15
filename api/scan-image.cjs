// api/scan-image.js

// Import the Google Cloud Vision Node.js client
const { ImageAnnotatorClient } = require('@google-cloud/vision');

// *** FIX: Explicitly pass the API key from environment variables ***
// This guarantees the client finds and uses the key you defined in Vercel.
const client = new ImageAnnotatorClient({
    key: process.env.GOOGLE_VISION_API_KEY
});
// ********************************************************************

// Keywords to help filter out irrelevant labels
const INGREDIENT_KEYWORDS = ['fruit', 'vegetable', 'meat', 'herb', 'spice', 'produce', 'food', 'dairy', 'grain', 'pasta', 'rice', 'chicken', 'beef'];

// This is the standard export function for Vercel Serverless (Node.js)
module.exports = async (req, res) => {
    // 1. Basic Method Check
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
    
    try {
        const { image } = req.body;
        
        if (!image) {
            return res.status(400).json({ error: 'Missing image data' });
        }

        // --- Call Google Cloud Vision API ---
        const [result] = await client.labelDetection({
            image: { content: image }, // The Base64 string from the frontend
        });
        // ... (rest of the logic below is the same, handling filtering and parsing)
        
        const labels = result.labelAnnotations || [];
        
        // --- Process and Filter Results ---
        const ingredients = labels
            .filter(label => 
                label.score > 0.70 && 
                INGREDIENT_KEYWORDS.some(keyword => label.description.toLowerCase().includes(keyword))
            )
            .map(label => label.description.toLowerCase().replace(/s$/, '')); 
        
        const ingredientsString = [...new Set(ingredients)].join(', ');

        return res.status(200).json({ 
            ingredientsString: ingredientsString || 'No ingredients detected' 
        });

    } catch (error) {
        console.error("Vision API Error:", error.message);
        // Ensure the error response is always JSON, preventing the frontend crash
        return res.status(500).json({ error: 'Authentication Failed or Runtime Error. Check Vercel Logs.' });
    }
};