const { hashPassword, isPasswordCorrect } = require('../lib/paswordUtils.js');
const User = require('../models/user.js');
const JWT = require('../lib/JWT.js');

module.exports.user_registration_handler = async (req, res) => {
	const { name, email, password } = req.body;
	const { hash, salt } = hashPassword(password);

	try {
		await new User({ name, email, hash, salt }).save();
		res.json('User registered successfully');
	} catch (err) {
		res.status(503).json({
			Error: {
				msg: 'Something went wrong!',
				err: err,
			},
		});
	}
};

module.exports.user_login_handler = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json('Invalid email or password');
		}

		const { hash: savedHash, salt: savedSalt } = user;
		if (!isPasswordCorrect(savedHash, savedSalt, password)) {
			return res.status(400).json('Invalid email or password');
		}

		const token = new JWT(process.env.SECRET).encode({ userId: user.id });
		res.json({ token });
	} catch (err) {
		console.log({ err });
		res.status(503).json({
			Error: {
				msg: 'Something went wrong!',
				err: err,
			},
		});
	}
};
