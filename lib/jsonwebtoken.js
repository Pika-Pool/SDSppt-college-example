const jwt = require('jsonwebtoken');

module.exports = function (key) {
	this.key = key;

	function extractTokenFromBearer(bearerToken) {
		const bearerRegex = /Bearer (?<jwtToken>[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+\/=]*)$/;

		const m = bearerToken.match(bearerRegex);
		if (!m) return false;

		return m.groups.jwtToken;
	}

	return {
		encode: payload => {
			const jwtToken = jwt.sign(payload, process.env.SECRET, {
				algorithm: 'HS256', // default: HS256
				expiresIn: '10s',
				notBefore: '3s', // token cannot be used before 3s
				// audience: '',
				// issuer: '',
				// jwtid: '',
				// subject: '',
				// noTimestamp: '',
				// header: '',
				// keyid: '',
			});

			console.log({ jwtToken });
			return jwtToken;
		},
		decode: bearerToken => {
			const jwtToken = extractTokenFromBearer(bearerToken);
			if (!jwtToken) {
				console.log('Invalid bearer token');
				return false;
			}

			const { payload, header, signature } = jwt.verify(
				jwtToken,
				process.env.SECRET,
				{
					algorithms: 'HS256', // defult HS256
					complete: true,
					// audience: '',
					// issuer: '',
					// ignoreExpiration: false,
					// ignoreNotBefore: false,
					// subject: '',
					// clockTolerance: 100,		// in seconds,
					// maxAge: '2 days',
					// clockTimestamp: '',
				}
			);

			console.log({ payload, header, signature });
			return payload;
		},
	};
};
