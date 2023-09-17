const express = require('express');
const session = require('express-session')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./models/user');
const app = express();
const port = 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(
    session({
        secret: 'secret_key',
        resave: false,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());

// PassportのLocalStrategyを設定
passport.use(
    new LocalStrategy((username, password, done) => {
        User.findOne({ where: { username: username } })
            .then((user) => {
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                bcrypt.compare(password, user.password, (err, res) => {
                    if (err) throw err;
                    if (res === true) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                });
            })
            .catch((err) => done(err));
    })
);

// Passportのセッション管理
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findByPk(id)
        .then((user) => {
            done(null, user);
        })
        .catch((err) => done(err));
});


app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/views/register.html');
});
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(username, password, hashedPassword)
        const user = await User.create({ username, password: hashedPassword });
        res.json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Registration failed' });
    }
});

// ログインエンドポイント
app.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/success',
        failureRedirect: '/failure',
    })
);

// ログイン成功
app.get('/success', (req, res) => {
    res.json({ message: 'Login successful', user: req.user });
});

// ログイン失敗
app.get('/failure', (req, res) => {
    res.status(401).json({ message: 'Login failed' });
});

// アプリケーションのポート設定
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
