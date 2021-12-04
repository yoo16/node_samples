CREATE TABLE items (
    id bigint UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    code varchar(255) UNIQUE NOT NULL,
    name varchar(255) NOT NULL,
    price int NOT NULL,
    amount int,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);