// api/scan-image.js (Now using ESM syntax)

// 1. Use 'import' instead of 'require'
import { ImageAnnotatorClient } from '@google-cloud/vision';

// FIX: Explicitly pass the API key from environment variables
const client = new ImageAnnotatorClient({
    key: process.env.GOOGLE_VISION_API_KEY // MUST match the Vercel key name
});

const INGREDIENT_KEYWORDS = ['fruit', 'vegetable', 'meat', 'herb', 'spice', 'produce', 'food', 'dairy', 'grain', 'pasta', 'rice', 'chicken', 'beef'];

// 2. Use 'export default' instead of 'module.exports'
export default async (req, res) => {
    if (req.method !== 'POST') {
        // Ensure error response is always JSON
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
    
    try {
        const { image } = req.body;
        
        if (!image) {
            return res.status(400).json({ error: 'Missing image data' });
        }

        const [result] = await client.labelDetection({
            image: { content: image },
        });

        const labels = result.labelAnnotations || [];
        
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
        return res.status(500).json({ error: 'Serverless Function Runtime Error. Check Vercel Logs.' });
    }
};