"use strict";

const http = require('http');
const httpStatus = require('http-status-codes');
const fs = require('fs');
const config = require('config');

const port = config.server.port;
const host = config.server.host;

const app = http.createServer(function (request, response) {
    request.on('end', () => {
        let url = 'public' + (request.url.endsWith('/') ? request.url + 'index.html' : request.url);
        // console.log(url);
        if (fs.existsSync(url)) {
            fs.readFile(url, (error, data) => {
                if (!error) {
                    response.writeHead(httpStatus.OK, { "Content-Type": "text/html" });
                    response.end(data);
                } else {
                    response.writeHead(httpStatus.INTERNAL_SERVER_ERROR, { "Content-Type": "text/html" });
                    response.end();
                }
            });
        } else {
            response.writeHead(httpStatus.NOT_FOUND, { "Content-Type": "text/html" });
            response.end('Not Found');
        }
    });

    console.log(`Method: ${request.method}`);
    console.log(`URL: ${request.url}`);
});

app.listen(port, host);

console.log(`Server listen: ${host}:${port}`);