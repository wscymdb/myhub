CREATE DATABASE IF NOT EXISTS myhub;

CREATE TABLE
    IF NOT EXISTS `users`(
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(30) NOT NULL UNIQUE,
        password VARCHAR(50) NOT NULL,
        createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );