const crypto = require('crypto');

const iterations = 10000,
	keylen = 64,
	digestAlg = 'sha256';

function hashPassword(password) {
	const salt = crypto.randomBytes(128).toString('hex');
	const hash = crypto
		.pbkdf2Sync(password, salt, iterations, keylen, digestAlg)
		.toString('hex');

	return {
		salt: salt,
		hash: hash,
	};
}

function isPasswordCorrect(savedHash, savedSalt, passwordAttempt) {
	return (
		savedHash ==
		crypto
			.pbkdf2Sync(
				passwordAttempt,
				savedSalt,
				iterations,
				keylen,
				digestAlg
			)
			.toString('hex')
	);
}

module.exports = { hashPassword, isPasswordCorrect };
