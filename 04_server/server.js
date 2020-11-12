"use strict";

// http モジュールを読み込み
const http = require('http');
//const httpStatus = require('http-status-codes');

const port = 3000;
const host = '127.0.0.1';
const message = "<h1>Hello Node Server!</h1>\n";

const app = http.createServer(function (request, response) {
    // HTTPヘッダ
    response.writeHead(200, {'Content-Type': 'text/html'});
    //response.writeHead(httpStatus.OK, {'Content-Type': 'text/html'});

    // レスポンス書き込み
    response.write(message);

    //レスポンスを閉じる
    response.end();

    console.log(`Method: ${request.method}`);
    console.log(`Response: ${message}`);
});

// ホストとポストを指定して監視
app.listen(port, host);

console.log(`Server listen: ${host}:${port}`);