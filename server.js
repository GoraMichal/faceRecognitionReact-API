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