import { GoogleGenerativeAI } from '@google/generative-ai';

const checkApiKey = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in environment variables');
  }
  return apiKey;
};

export const generateAIResponse = async (message) => {
  try {
    // Validate API key
    const apiKey = checkApiKey();
    
    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    console.log('Initializing Gemini with API key:', apiKey.substring(0, 4) + '...');

    // Get the model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Generate content
    console.log('Sending message to Gemini:', message);
    const result = await model.generateContent(message);
    
    if (!result.response) {
      throw new Error('No response from Gemini AI');
    }

    const response = await result.response;
    const text = response.text();

    if (!text) {
      throw new Error('Empty response from Gemini AI');
    }

    console.log('Received response from Gemini:', text.substring(0, 50) + '...');
    return text;

  } catch (error) {
    console.error('Gemini AI Error:', {
      message: error.message,
      status: error.status,
      details: error.errorDetails
    });
    
    if (error.message.includes('API_KEY_INVALID')) {
      throw new Error('Invalid Gemini API key. Please check your configuration.');
    }
    
    throw new Error(error.message || 'Failed to generate AI response');
  }
};