if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const express = require('express');
const dbConnection = require('./config/database.js');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const authRouter = require('./routes/auth.js');
const usersRouter = require('./routes/users.js');
app.use('/auth', authRouter);
app.use('/users', usersRouter);

app.use('*', (req, res) => {
	res.status(404).json('Invalid route');
});

app.listen(process.env.PORT || 3000, () => {
	console.log(`Listening at https://localhost:${process.env.PORT || 3000}/`);
});
