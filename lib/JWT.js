var crypto = require('crypto');

module.exports = function (key) {
	this.key = key;

	function encodeBase64(str) {
		return Buffer.from(str).toString('base64');
	}

	function decodeBase64(str) {
		return Buffer.from(str, 'base64').toString('utf-8');
	}

	function stringify(obj) {
		return JSON.stringify(obj);
	}

	function extractTokenFromBearer(bearerToken) {
		const bearerRegex = /Bearer (?<jwtToken>[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+\/=]*)$/;

		const m = bearerToken.match(bearerRegex);
		if (!m) return false;

		return m.groups.jwtToken;
	}

	/*Takes head and body encoded as base64
	 * and return a hash(head + "." + body,secret)
	 */
	function checkSumGen(head, body) {
		const checkSumStr = head + '.' + body;
		const hash = crypto.createHmac('sha256', key);
		const checkSum = hash
			.update(checkSumStr)
			.digest('base64')
			.toString('utf8');
		return checkSum;
	}

	var alg = { alg: 'HS256', typ: 'JWT' };

	return {
		encode: obj => {
			let result = '';

			const header = encodeBase64(stringify(alg));
			console.log(header);
			result += header + '.';

			const body = encodeBase64(stringify(obj));
			console.log(body);
			result += body + '.';

			const checkSum = checkSumGen(header, body);
			result += checkSum;

			return result;
		},
		decode: bearerToken => {
			const jwtToken = extractTokenFromBearer(bearerToken);
			if (!jwtToken) {
				console.log('Invalid bearer token');
				return false;
			}

			const jwtArr = jwtToken.split('.');
			const head = jwtArr[0];
			const body = jwtArr[1];
			const hash = jwtArr[2];
			const checkSum = checkSumGen(head, body);

			if (hash === checkSum) {
				console.log('jwt hash: ' + hash);
				console.log('gen hash: ' + checkSum);
				console.log('JWT was authenticated');
				return JSON.parse(decodeBase64(body));
			} else {
				console.log('JWT was not authenticated');
				console.log('jwt hash: ' + hash);
				console.log('gen hash: ' + checkSum);
				return false;
			}
		},
	};
};
