//モジュール読み込み
const express = require('express')
const request = require('request')

const totalUrl = 'https://covid19-japan-web-api.now.sh/api/v1/total';
const prefecturesUrl = 'https://covid19-japan-web-api.now.sh/api/v1/prefectures';
const positivesUrl = 'https://covid19-japan-web-api.now.sh/api/v1/positives';

//サーバーを作る
const app = express()

//Copy & Paste
//JSON
app.use(express.json());

//URL エンコード
app.use(express.urlencoded({ extended: true }));

//CROS対策 XSS クロスサイトスクリプティング
app.use((req, res, next) => {
    console.log(`middleware: all. url: ${req.url}`);

    //CROS設定: 全てのドメインに対して許可 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    //次の処理
    next();
});


//POST リクエスト
app.post('/', (req, res) => {
    console.log('post access!!');

    let message = req.body.message;

    let result = {
        'message': message,
        'datetime': new Date(),
    };
    res.send(result);
})

//GETリクエスト
app.get('/', (req, res) => {
    //GET パラメータ (id)
    let id = req.query.id;
    console.log(id);

    //result を作成（さくせい）
    let result = {
        'id': id
    };

    //レスポンス
    res.send(result);
});

app.post('/api/covid19/total', (req, res) => {
    //レスポンス
    let options = {
        url: totalUrl,
        method: 'GET',
        headers: { 'Content-type': 'application/json' },
        qs: null,
        json: true
    };

    request(options, (error, response, body) => {
        if (error) {
            console.error("error", error);
        } else {
            res.send(body);
        }
    });
});

//サーバ listen
app.listen(3000)