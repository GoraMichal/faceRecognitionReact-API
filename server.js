//const express = require('express');

//const app = express();

//app.get('/', (req, res) => {
//    res.send('msg');
//})

//app.listen(2000);


const http = require('http');

const server = http.createServer((request, response) => {
    console.log('headers', request.headers)
    console.log('method', request.method)
    console.log('url', request.url)

    const user = {
        name: 'Kamil',
        hobby: 'Programowanie'
    }

    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(user));
})

server.listen(3000);