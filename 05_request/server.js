"use strict";

const http = require('http');
const httpStatus = require('http-status-codes');
// const process = require('process');

const querystring = require('querystring');
const fs = require('fs');
const config = require('config');
// config.env = process.env.NODE_ENV;

const html = fs.readFileSync('index.html');
const port = config.server.port;
const host = config.server.host;

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

console.log(`Server listen: ${host}:${port}`);