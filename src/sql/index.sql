CREATE DATABASE IF NOT EXISTS myhub;

-- 用户表

CREATE TABLE
    IF NOT EXISTS `users`(
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(30) NOT NULL UNIQUE,
        password VARCHAR(50) NOT NULL,
        createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

-- 动态表

CREATE TABLE
    IF NOT EXISTS `moment` (
        id INT PRIMARY KEY AUTO_INCREMENT,
        content VARCHAR(1000) NOT NULL,
        user_id INT NOT NULL,
        createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        Foreign Key (user_id) REFERENCES `users`(id) ON DELETE CASCADE ON UPDATE CASCADE
    );

-- 评论表

--  comment_id 表示一个动态会有评论，但是这条评论可能被别人评论

CREATE TABLE
    IF NOT EXISTS `comment`(
        id INT PRIMARY KEY AUTO_INCREMENT,
        content VARCHAR(1000) NOT NULL,
        moment_id INT NOT NULL,
        user_id INT NOT NULL,
        comment_id INT DEFAULT NULL,
        crateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        Foreign Key (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
        Foreign Key (moment_id) REFERENCES moment(id) ON DELETE CASCADE ON UPDATE CASCADE,
        Foreign Key (comment_id) REFERENCES comment(id) ON DELETE CASCADE ON UPDATE CASCADE
    );

-- 标签表

CREATE TABLE
    IF NOT EXISTS `label`(
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(10) NOT NULL,
        createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

-- label表和moment之间的关系表

--  PRIMARY KEY(mid, lid)表示联合主键，表示只有当联合主键的值一起发挥某种作用的时候才会触发联合主键的规范

-- eg：(mid：3 lid：3) (mid：3 ld：3) 有一组mid是3lid是4  又有一组数据mid是3lid4 这时候联合主键有返回规范作用  如果另一组lid是5那么就不会报错

CREATE TABLE
    IF NOT EXISTS `moment_label`(
        moment_id INT NOT NULL,
        label_id INT NOT NULL,
        createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY(moment_id, label_id),
        Foreign Key (moment_id) REFERENCES moment(id) ON UPDATE CASCADE ON DELETE CASCADE,
        Foreign Key (label_id) REFERENCES label(id) ON UPDATE CASCADE ON DELETE CASCADE
    );