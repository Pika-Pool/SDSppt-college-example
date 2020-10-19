const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
	{
		name: String,
		email: String,
		hash: String,
		salt: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model('User', UserSchema, 'users');
