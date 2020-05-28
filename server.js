const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('getting root');
});

//http://localhost:3000/profile
app.get('/profile', (req, res) => {
    res.send('getting profile');
});

//http://localhost:3000/profile/person
app.get('/profile/person', (req, res) => {
    //res.send('<h2>msg</h2>');
    const user = {
        name: 'Michail',
        surname: 'Tal',
    }
    res.send(user);
})

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