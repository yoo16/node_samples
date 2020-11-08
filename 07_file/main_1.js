"use strict";

const port = 3000;
const http = require("http");
const httpStatus = require("http-status-codes");
const fs = require("fs"); // fsモジュールをインポート

const routeMap = {  // HTMLの経路を設定
  "/": "views/index.html",
  "/second": "views/second.html"
}

const app = http.createServer();
app.on("request", (request, response) => {
  console.log("リクエストを受信しました。");
  
  response.writeHead(httpStatus.OK, {
    "Content-Type": "text/html"
  });
  
  if (routeMap[request.url]) {
    // ファイルを読んで、内容をレスポンスする
    fs.readFile(routeMap[request.url], (error, data) => {
      response.write(data);
      response.end();
    });
  } else {
    response.write("<h1>Not found.</h1>");
    response.end();
  }
  
  console.log("レスポンスを送信しました。");
});

app.listen(port);
console.log(`サーバー起動、ポート（${port}）を監視中・・・`);