const express = require('express');
var bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

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

const database = {
    users: [
        {
            id: '1',
            name: 'kamil',
            password: 'kamil',
            email: 'kamil',
            entries: 0,
            joined: new Date()
        },
        {
            id: '2',
            name: 'Maciek',
            password: 'maciek',
            email: 'maciek@o2.pl',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email
        && req.body.password === database.users[0].password) {
        res.json(database.users[0]);
    } else {
        res.status(400).json('Login error');
    }
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;

    db('users')
        .returning('*')
        .insert({
            email: email,
            name: name,
            joined: new Date
        })
        //.then(console.log);
        .then(user => {
            res.json(user[0]);
        })
        .catch(err => res.status(400).json(err));
})


//where precyzuje konkretne wartosci.
//jezeli wartosc i wlasciwosc maja ta sama nazwe to mozna np. { id }, przeciwnie { id: klucz }
app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    db.select('*').from('users').where({ id })
        .then(user => {
            //console.log(user[0]);
            if (user.lenght) {
                res.json(user[0])
            } else {
                res.status(400).json('User not found')
            }
        })
        .catch(err => res.status(400).json('User not found'))

    //if (!found) {
    //    res.status(404).json('User not found');
    //}
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if (!found) {
        res.status(404).json('User not found');
    }
})

app.listen(3000);
