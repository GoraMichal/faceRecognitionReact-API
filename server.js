const express = require('express');
var bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id: '1',
            name: 'Kamil',
            password: 'kamil',
            email: 'kamil@o2.pl',
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
    //login: [
    //    {
    //        id: '9',
    //        hash: '',
    //        email: 'kamil@o2.pl'
    //    }
    //]
}

app.get('/', (req, res) => {
    res.send(database.users);
    //res.send('Server working');
})

app.post('/signin', (req, res) => {
    // Load hash from your password DB.
    //bcrypt.compare("kamil", '$2a$10$OsLZ0WMdAofxH/krVR4Geugac7o0ZtOV.HAGKgz/ASpEzEcSU4wXS', function (err, res) {
    //    console.log("first", res);
    //});
    //bcrypt.compare("veggies", '$2a$10$OsLZ0WMdAofxH/krVR4Geugac7o0ZtOV.HAGKgz/ASpEzEcSU4wXS', function (err, res) {
    //    console.log("second", res);
    //});

    if (req.body.email === database.users[0].email
        && req.body.password === database.users[0].password) {
        res.json('success');
    } else {
        res.status(400).json('Login error');
    }
    //res.send('Post working');
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;

    bcrypt.hash(password, null, null, function (err, hash) {
        console.log(hash);
    });

    database.users.push({
        id: '10',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1])
})

////:id - konkretne parametry z id
app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    })
    if (!found) {
        res.status(404).json('User not found');
    }
})
//cannot set headers after they are sent to the client

app.post('/image', (req, res) => {
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


app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    database.users.forEach(user => {
        if (user.id === id) {
            res.json(user);
        } else {
            res.status(404).json('wrong user');
        }
    })
})


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