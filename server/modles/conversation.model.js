const mongoose = require('mongoose');

const Conversation = new mongoose.Schema(
    {
        contact: [Object],
		email: { type: String, required: true, unique: true },
        message: [Object],
        quote: { type: String },
    },
    { collection: 'conversation_data' }
)

const model = mongoose.model('ConversationData', Conversation);

module.exports = model;