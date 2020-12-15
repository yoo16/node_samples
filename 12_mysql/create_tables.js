// DB の connect 処理をモジュールにして読み込む
const db = require('./lib/db');

//外部SQL ファイルの設定
let files = [
    './sql/01_create_table_users.sql',
];

//外部SQL ファイルの実行
files.forEach((file) => {
    db.importSQL(file);
})