const dotenv = require('dotenv');

dotenv.config();
const db_name = process.env.DB_NAME;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

exports.info = {
    database: db_name,
    host: host,
    user: user,
    port: port,
    password: password,
}