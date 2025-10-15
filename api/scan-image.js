// api/scan-image.js

// You must install: npm install @google-cloud/vision
const { ImageAnnotatorClient } = require('@google-cloud/vision');

// The client automatically picks up the API key from the GOOGLE_APPLICATION_CREDENTIALS 
// or other configured environment variables in Vercel.
const client = new ImageAnnotatorClient(); 

// Simple list to help filter out labels like 'table' or 'floor'
const INGREDIENT_KEYWORDS = ['fruit', 'vegetable', 'meat', 'herb', 'spice', 'produce', 'food', 'dairy', 'grain', 'bean', 'pasta', 'rice', 'chicken', 'beef'];

// This is the standard export format for Vercel Serverless Functions
module.exports = async (req, res) => {
    // Vercel uses req/res objects similar to Express
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
            image: { content: image }, // The base64 string
        });

        const labels = result.labelAnnotations || [];
        
        // --- Process and Filter Results ---
        const ingredients = labels
            .filter(label => 
                // 1. Filter out labels with low confidence
                label.score > 0.70 && 
                // 2. Filter out irrelevant general objects
                INGREDIENT_KEYWORDS.some(keyword => label.description.toLowerCase().includes(keyword) || 
                                                     label.description.toLowerCase().endsWith('s') && 
                                                     INGREDIENT_KEYWORDS.some(k => k === label.description.toLowerCase().slice(0, -1)))
            )
            // 3. Get the description and convert to lowercase for matching
            .map(label => label.description.toLowerCase().replace(/s$/, '')); // Simple plural removal
        
        // 4. Create a unique, comma-separated string
        const ingredientsString = [...new Set(ingredients)].join(', ');

        return res.status(200).json({ 
            ingredientsString: ingredientsString || 'No ingredients detected' 
        });

    } catch (error) {
        console.error("Vision API Error:", error.message);
        // Do not expose sensitive error details
        return res.status(500).json({ error: 'Failed to process image recognition. Check Serverless logs.' });
    }
};