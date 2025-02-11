const db = require('../lib/db');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

class User {
    table = "users"
    auth = async (email, password) => {
        const sql = `SELECT * FROM ${table} WHERE ?;`;
        var post = { email: email };
        const con = await mysql.createConnection(db.info)
        var user;
        try {
            const [rows, fields] = await con.query(sql, post);
            user = rows[0];
        } catch (error) {

        } finally {
            await con.end();
        }
        if (user.id && bcrypt.compareSync(password, user.password)) {
            return user;
        }
        return;
    }

    add = async (post) => {
        var sql = `INSERT INTO ${table} SET ?;`;
        const con = await mysql.createConnection(db.info)
        var result;
        try {
            post.password = bcrypt.hashSync(post.password, 10);
            result = await con.query(sql, post);
        } catch (error) {

        } finally {
            await con.end();
        }
        return result;
    }
}

module.exports = User