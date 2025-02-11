-- DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    id bigint UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name varchar(255) NOT NULL,
    email varchar(255) UNIQUE NOT NULL,
    password varchar(255) NOT NULL,
    email_ varchar(255) NOT NULL,
    email_verified_at DATETIME DEFAULT NULL,
    remember_token varchar(100) DEFAULT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);