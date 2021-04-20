const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'andrewsaba',
    password : '',
    database : 'facerecognition'
  }
});

const app = express();

// const database = {
// 	users: [
// 		{
// 		id: '123', 
// 		name: 'john',
// 		password: 'cookies',
// 		email: 'john@gmail.com',
// 		entries: 0,
// 		joined: new Date()
// 		},
// 		{
// 		id: '124', 
// 		name: 'sally',
// 		password: 'bananas',
// 		email: 'sally@gmail.com',
// 		entries: 0,
// 		joined: new Date()
// 		}
// 	],
// 	// login: [
// 	// 	{
// 	// 		id: '987',
// 	// 		hash: '',
// 	// 		email: 'john@gmail.com'
// 	// 	}
// 	// ]    /* test database */
// }

app.use(cors())
app.use(bodyParser.json());


app.get('/', (req, res) => { res.send(database.users) })

app.post('/signin', signin.handleSignin(db, bcrypt)) /* optional advanced js way where we run the function with db & bcrypt then it automatically recieves (req, res) */

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })	
	
app.put('/image', (req, res) => { image.handleImage(req, res, db) })

app.post('/imageUrl', (req, res) => { image.handleApiCall(req, res) })

	
app.listen(3000, () => {
	console.log('app is running on port 3000')
});


// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });


/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/userId --> GET = user
/image --> PUT --> user  

*/