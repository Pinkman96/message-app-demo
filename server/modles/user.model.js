const mongoose = require('mongoose');

const User = new mongoose.Schema(
    {
        name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
        contact: [Object],
        conversation: [Object],
        quote: { type: String },
    },
    { collection: 'user_data' }
)

const model = mongoose.model('UserData', User);

module.exports = model;