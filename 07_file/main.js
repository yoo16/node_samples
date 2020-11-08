"use strict";

const port = 3000;
const http = require("http");
const httpStatus = require("http-status-codes");
const fs = require("fs");

const app = http.createServer();
app.on("request", (request, response) => {
    console.log("リクエストを受信しました。");

    let viewUrl = `views${request.url}.html`;

    // ファイルを読んで、内容をレスポンスする
    fs.readFile(viewUrl, (error, data) => {
        if (error) {
            response.writeHead(httpStatus.NOT_FOUND, {
                "Content-Type": "text/html"
            });
            response.write("<h1>Not found.</h1>");
        } else {
            response.writeHead(httpStatus.OK, {
                "Content-Type": "text/html"
            });
            response.write(data);
        }
        response.end();
    });

    console.log("レスポンスを送信しました。");
});

app.listen(port);
console.log(`サーバー起動、ポート（${port}）を監視中・・・`);