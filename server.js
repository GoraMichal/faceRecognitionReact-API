const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const database = {
    users: [
        {
            id: '1',
            name: 'Kamil',
            email: 'kamil@o2.pl',
            password: 'kamil',
            entries: 0,
            joined: new Date()
        },
        {
            id: '2',
            name: 'Maciek',
            email: 'maciek@o2.pl',
            password: 'maciek',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.send('Server working');
})

app.post('/signin', (req, res) => {
    if (req.body.id === database.users[0].id
        && req.body.name === database.users[0].name) {
        res.json('success');
    } else {
        res.status(400).json('Error login');
    }
    //res.send('Post working');
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    database.users.push({
        id: '1',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1])
})

app.listen(3000, () => {
    //console.log('App port 3000')
});

/*
 / -> res
 /signin -> POST
 /register -> POST = user
 /profile/:userId -> GET = user
 /image -> PUT -> user
*/


/* Temp code
const express = require('express');
const bodyParser = require('body-parser')

const app = express();

app.use(express.static(__dirname + '/public'))

//app.use((req, res, next) => {
//    console.log('MSG');
//    next();
//})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/', (req, res) => {
    //req.query
    //req.body
    //req.header
    //req.params
    res.send('getting root');
});

////http://localhost:3000/profile
app.get('/profile', (req, res) => {
    res.send('getting profile');
});

////http://localhost:3000/profile
////get, post, put, use
app.get('/profile', (req, res) => {
    //res.send('<h2>msg</h2>');
    console.log(req.body);
    const user = {
        name: 'Michail',
        surname: 'Tal',
    }
    res.send(user);
});

app.post('/profile', (req, res) => {
    //res.send('<h2>msg</h2>');
    console.log(req.body);
    res.send('Good job');
});

app.listen(3000);


//const http = require('http');

//const server = http.createServer((request, response) => {
//    console.log('headers', request.headers)
//    console.log('method', request.method)
//    console.log('url', request.url)

//    const user = {
//        name: 'Kamil',
//        hobby: 'Programowanie'
//    }

//    response.setHeader('Content-Type', 'application/json');
//    response.end(JSON.stringify(user));
//})

//server.listen(3000);
*/