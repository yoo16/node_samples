//モジュール読み込み
const express = require('express');
const ejs = require('ejs');

//Express 作成
const app = express();

//EJS 設定
app.set('ejs', ejs.renderFile);

//JSON
app.use(express.json());

// URLエンコードされたデータを解析する
//ver4.x
app.use(express.urlencoded({ extended: true }));

//ルーティング
app.get('/', (req, res) => 
    res.render('index.ejs', { title: 'Index Page' })
);

app.get('/about', (req, res) => 
    res.render('about.ejs', { title: 'About Page' })
);

app.get('/login', (req, res) => 
    res.render('login.ejs', { title: 'Login' })
);

app.get('/user', (req, res) => {
    res.render('user.ejs', { title: 'User Page' })
})

app.post('/auth', (req, res) => {
    const login_name = req.body.login_name;
    const password = req.body.password;

    if (login_name == 'test' && password == '1234') {
        res.redirect('/user');
    } else {
        res.redirect('/login');
    }
})

app.post('/logout', (req, res) => {
    res.redirect('/login');
})

//ポート:3000待機
app.listen(3000);