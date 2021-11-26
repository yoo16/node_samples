"use strict";

// http モジュールを読み込み
const http = require('http');
const port = 3000;
const host = 'localhost';
const message = "<h1>Hello Node Server!</h1>\n";

const app = http.createServer((req, res) => {
    // HTTPヘッダ
    res.writeHead(200, {'Content-Type': 'text/html'});

    // レスポンス書き込み
    res.write(message);

    //レスポンスを閉じる
    res.end();

    console.log(`Method: ${request.method}`);
    console.log(`Response: ${message}`);
});

// ホストとポートを指定して監視
app.listen(port, host);

console.log(`Server listen: http://${host}:${port}`);