const JWT = require('../lib/JWT.js');
const User = require('../models/user');

module.exports.user_dashboard_handler = async (req, res) => {
	const jwt = new JWT(process.env.SECRET);
	const bearerToken = req.header('authorization') || '';

	let jwtBody = null;
	// check if jwt token is valid
	try {
		jwtBody = jwt.decode(bearerToken);
		if (!jwtBody) {
			return res.status(401).json({
				msg:
					'You are either not authenticated or authenticated incorrectly!!',
			});
		}
	} catch (err) {
		return res.status(401).json({
			msg: 'Error while decoding jwt',
			err,
		});
	}

	// find user using the jwt payload/body
	const { userId } = jwtBody;
	try {
		const user = await User.findById(userId);
		res.json(user);
	} catch (err) {
		res.status(503).json({
			Error: {
				msg: 'Something went wrong!!',
				err: err,
			},
		});
	}
};
