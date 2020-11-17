"use strict";

const http = require('http');
const httpStatus = require('http-status-codes');
const fs = require('fs');
const config = require('config');

const port = config.server.port;
const host = config.server.host;

const app = http.createServer();
app.on('request', (request, response) => {
    let filePath = 'public' + (request.url.endsWith('/') ? request.url + 'index.html' : request.url);
    let contentType = { "Content-Type": "text/html" };
    console.log(filePath);
    if (fs.existsSync(filePath)) {
        fs.readFile(filePath, (error, data) => {
            if (!error) {
                response.writeHead(httpStatus.OK, contentType);
                response.end(data);
            } else {
                response.writeHead(httpStatus.INTERNAL_SERVER_ERROR, contentType);
                response.end('<h1>Internal Server Error</h1>');
            }
        });
    } else {
        response.writeHead(httpStatus.NOT_FOUND, contentType);
        response.end('<h1>Not Found</h1>');
    }

    console.log(`Method: ${request.method}`);
    console.log(`URL: ${request.url}`);
});

app.listen(port, host);

console.log(`Server listen: ${host}:${port}`);