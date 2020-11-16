"use strict";

const http = require('http');
const httpStatus = require('http-status-codes');
const fs = require('fs');
const path = require('path');
const config = require('config');

const port = config.server.port;
const host = config.server.host;

const contentTypes = {
    'html': 'text/html',
    'png': 'image/png',
    'json': 'application/json',
};

const filePaths = {
    'html': './public/',
    'png': './public/images',
    'json': './public/json',
};

const app = http.createServer();
app.on("request", (request, response) => {
    let url = request.url;
    let contentType = 'text/html';
    let filePath = url;
    let ext = getExtension(url);

    if (contentTypes[ext]) contentType = contentTypes[ext];
    if (filePaths[ext]) filePath = filePaths[ext] + url;

    // console.log(ext);
    // console.log(contentType);
    // console.log(filePath);

    loadContent(filePath, contentType, response);
});

app.listen(port, host);

console.log(`Server listen: ${host}:${port}`);

function getExtension(url) {
    let ext = path.extname(url||'').split('.');
    return ext[ext.length - 1];
}

const loadContent = (path, contentType, response) => {
    if (fs.existsSync(path)) {
        response.writeHead(httpStatus.OK, { "Content-Type": contentType });
        fs.readFile(path, (error, data) => {
            if (error) {
                console.log(error);
                return;
            }
            response.write(data);
            response.end();
        });
    } else {
        response.writeHead(httpStatus.NOT_FOUND, { "Content-Type": "text/html" });
        response.write("<h1>Not Found</h1>");
        response.end();
    }
};