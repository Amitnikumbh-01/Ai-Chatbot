import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    messages: [
      {
        role: {
          type: String,
          required: true,
          enum: ['user', 'assistant'],
        },
        content: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Change this line to use default export
const Chat = mongoose.model('Chat', chatSchema);
export default Chat;  // Changed to default export