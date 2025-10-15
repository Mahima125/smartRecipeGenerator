import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.HUGGING_FACE_HUB_TOKEN ); // Free API key from huggingface.co

export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
    
    try {
        const { image } = req.body;
        
        if (!image) {
            return res.status(400).json({ error: 'Missing image data' });
        }

        // Convert base64 to blob
        const imageBuffer = Buffer.from(image, 'base64');

        // Use image classification model
        const result = await hf.imageClassification({
            data: imageBuffer,
            model: 'google/vit-base-patch16-224' 
        });

        console.log('HuggingFace results:', result);

        // Extract labels
        const ingredients = result
            .filter(item => item.score > 0.3)
            .map(item => item.label.toLowerCase())
            .slice(0, 5);

        const ingredientsString = ingredients.join(', ');

        return res.status(200).json({ 
            ingredientsString: ingredientsString || 'No ingredients detected'
        });

    } catch (error) {
        console.error("HuggingFace Error:", error);
        return res.status(500).json({ 
            error: 'Image classification failed',
            details: error.message 
        });
    }
};
