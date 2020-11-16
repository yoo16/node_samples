"use strict";

const http = require('http');
const httpStatus = require('http-status-codes');
const fs = require('fs');
const config = require('config');

const port = config.server.port;
const host = config.server.host;

const routeMap = {
    '/': 'index.html',
    '/info': 'info.html',
    '/user/': 'user/index.html',
}

const app = http.createServer();

app.on("request", (request, response) => {
    let url = '';
    if (url = routeMap[request.url]) {
        let template = `views/${url}`;
        // console.log(template);

        response.writeHead(httpStatus.OK, { "Content-Type": "text/html" });
        if (fs.existsSync(template)) {
            fs.readFile(template, (error, data) => {
                response.write(data);
                response.end();
            });
        } else {
            response.write(`Not found file: ${template}`);
            response.end();
        }
    } else {
        response.writeHead(httpStatus.NOT_FOUND, { "Content-Type": "text/html" });
        response.write("<h1>Not Found</h1>");
        response.end();
    }
});

app.listen(port, host);

console.log(`Server listen: ${host}:${port}`);