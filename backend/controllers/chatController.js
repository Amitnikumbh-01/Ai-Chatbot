import asyncHandler from 'express-async-handler';
import Chat from '../models/chatModel.js';
import { generateAIResponse } from '../utils/geminiAI.js';

// @desc    Send message and get AI response
// @route   POST /api/chat/send
// @access  Private
const sendMessage = asyncHandler(async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user._id;

    // Validate input
    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid message'
      });
    }

    // Find or create chat
    let chat = await Chat.findOne({ user: userId });
    if (!chat) {
      chat = new Chat({
        user: userId,
        messages: []
      });
    }

    // Add user message
    const userMessage = {
      role: 'user',
      content: message.trim(),
      timestamp: new Date()
    };
    chat.messages.push(userMessage);

    try {
      // Generate AI response
      console.log('Generating AI response for:', message);
      const aiResponse = await generateAIResponse(message);

      if (!aiResponse) {
        throw new Error('Empty response from AI');
      }

      // Add AI response to chat
      const assistantMessage = {
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };
      chat.messages.push(assistantMessage);

      // Save the chat
      await chat.save();

      // Send response
      return res.status(200).json({
        success: true,
        message: aiResponse,
        chat: chat.messages
      });

    } catch (aiError) {
      console.error('AI Generation Error:', aiError);
      // Save the chat with only user message
      await chat.save();
      return res.status(500).json({
        success: false,
        message: 'Failed to generate AI response',
        error: aiError.message
      });
    }

  } catch (error) {
    console.error('Chat Controller Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// @desc    Get chat history
// @route   GET /api/chat/history
// @access  Private
const getChatHistory = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const chat = await Chat.findOne({ user: userId });

    if (!chat) {
      return res.status(200).json([]);
    }

    return res.status(200).json(chat.messages);
  } catch (error) {
    console.error('Get History Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch chat history',
      error: error.message
    });
  }
});

// @desc    Delete specific message
// @route   DELETE /api/chat/message/:messageId
// @access  Private
const deleteMessage = asyncHandler(async (req, res) => {
  try {
    const { messageId } = req.params;
    const userId = req.user._id;

    // Validate messageId
    if (!messageId) {
      return res.status(400).json({
        success: false,
        message: 'Message ID is required'
      });
    }

    const chat = await Chat.findOne({ user: userId });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found'
      });
    }

    // Filter out the message to delete
    const originalLength = chat.messages.length;
    chat.messages = chat.messages.filter(
      message => message._id.toString() !== messageId
    );

    // Check if message was found and deleted
    if (chat.messages.length === originalLength) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    await chat.save();

    return res.status(200).json({
      success: true,
      message: 'Message deleted successfully'
    });

  } catch (error) {
    console.error('Delete Message Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete message',
      error: error.message
    });
  }
});

// @desc    Clear entire chat history
// @route   DELETE /api/chat/clear
// @access  Private
const clearChatHistory = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const chat = await Chat.findOne({ user: userId });

    if (!chat) {
      return res.status(200).json({
        success: true,
        message: 'Chat history is already empty'
      });
    }

    // Clear messages array
    chat.messages = [];
    await chat.save();

    return res.status(200).json({
      success: true,
      message: 'Chat history cleared successfully'
    });

  } catch (error) {
    console.error('Clear History Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to clear chat history',
      error: error.message
    });
  }
});

export {
  sendMessage,
  getChatHistory,
  deleteMessage,
  clearChatHistory
};