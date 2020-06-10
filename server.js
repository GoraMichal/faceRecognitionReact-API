const express = require('express');
var bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'admin',
        database: 'facerecoreact'
    }
});

//db.select('*').from('users').then(data => {
//    console.log(data);
//});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send(database.users);
})

//dependency injection
app.post('/signin', signin.hadleSignin(db, bcrypt))
app.post('/register', register.handleRegister(db, bcrypt))
app.post('/profile/:id', profile.handleProfile(db))
app.put('/image', (req, res) => { image.handleImage(req, res, db) })

//app.post('/signin', (req, res) => { signin.hadleSignin(req, res, db, bcrypt) })
//app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
//app.post('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })
//app.put('/image', (req, res) => { image.handleImage(req, res, db) })


app.listen(3000);
