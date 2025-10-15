// api/scan-image.js
import { ImageAnnotatorClient } from '@google-cloud/vision';

// FIXED: Use 'apiKey' instead of 'key', and correct env variable name
const client = new ImageAnnotatorClient({
    apiKey: process.env.GOOGLE_VISION_API_KEY  // Changed from 'key' to 'apiKey'
});

const INGREDIENT_KEYWORDS = [
    'fruit', 'vegetable', 'meat', 'herb', 'spice', 'produce', 'food', 
    'dairy', 'grain', 'pasta', 'rice', 'chicken', 'beef', 'fish',
    'cheese', 'egg', 'bread', 'sauce', 'oil', 'butter', 'tomato',
    'onion', 'garlic', 'pepper', 'carrot', 'potato', 'mushroom',
    'lettuce', 'spinach', 'broccoli', 'corn', 'bean', 'lemon'
];

export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
    
    try {
        const { image } = req.body;
        
        if (!image) {
            return res.status(400).json({ error: 'Missing image data' });
        }

        console.log('Starting Vision API call...');

        // Call Google Vision API
        const [result] = await client.labelDetection({
            image: { content: image },
        });

        const labels = result.labelAnnotations || [];
        
        console.log('Raw labels detected:', labels.map(l => `${l.description} (${Math.round(l.score * 100)}%)`));
        
        // Filter and process ingredients
        const ingredients = labels
            .filter(label => 
                label.score > 0.70 && 
                INGREDIENT_KEYWORDS.some(keyword => 
                    label.description.toLowerCase().includes(keyword)
                )
            )
            .map(label => label.description.toLowerCase().replace(/s$/, ''));
        
        const ingredientsString = [...new Set(ingredients)].join(', ');

        console.log('Filtered ingredients:', ingredientsString);

        return res.status(200).json({ 
            ingredientsString: ingredientsString || 'No ingredients detected'
        });

    } catch (error) {
        console.error("Vision API Error Details:", error);
        return res.status(500).json({ 
            error: 'Image recognition failed',
            details: error.message 
        });
    }
};
