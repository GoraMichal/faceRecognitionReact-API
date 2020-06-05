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

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    db.select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash)
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', req.body.email)
                    .then(user => {
                        console.log(user);
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('Wrong user'))
            } else {
                res.status(400).json('Wrong authentication')
            }
            //console.log(data);
        })
        .catch(err => res.status(400).json('Wrong authentication'))
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;

    var hash = bcrypt.hashSync(password);

    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        joined: new Date
                    })
                    //.then(console.log);
                    .then(user => {
                        res.json(user[0]);
                    })
                    .then(trx.commit)
                    .catch(trx.rollback)
            })
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
    db('users').where('id', '=', id)
        //.update({ entries:  })
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0])
            //console.log(entries);
        })
        .catch(err => res.status(400).json('Entries error'))
})

app.listen(3000);
