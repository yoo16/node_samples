"use strict";

const http = require('http');
const httpStatus = require('http-status-codes');
const querystring = require('querystring');
const fs = require('fs');
const config = require('config');
require('dotenv').config()


const html = fs.readFileSync('index.html');
// const port = config.server.port;
// const host = config.server.host;
const host = process.env.HOST
const port = process.env.PORT;

const app = http.createServer(function (request, response) {
    let post = '';

    request.on('data', (value) => {
        post+= value;
    });
    request.on('end', () => {
        if (post) {
            post = querystring.parse(post);
            console.log(post);
        }
        response.end(html);
    });
    response.writeHead(httpStatus.OK, {'Content-Type': 'text/html'});

    console.log(`Method: ${request.method}`);
    console.log(`URL: ${request.url}`);
});

app.listen(port, host);

console.log(`Server listen: http://${host}:${port}`);