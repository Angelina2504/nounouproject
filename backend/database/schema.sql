
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user'
);

CREATE TABLE tutor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    phone_number VARCHAR(20),
    address VARCHAR(255)
);

CREATE TABLE todo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    status ENUM('pending', 'completed'),
    date DATE
);

CREATE TABLE child (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lastname VARCHAR(255),
    firstname VARCHAR(255),
    birthdate DATE,
    allergy VARCHAR(255),
    users_id INT,
    tutor_id INT,
    FOREIGN KEY (users_id) REFERENCES users(id),
    FOREIGN KEY (tutor_id) REFERENCES tutor(id)
);

CREATE TABLE emergency (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lastname VARCHAR(255),
    firstname VARCHAR(255),
    address VARCHAR(255),
    phone_number VARCHAR(255),
    child_id INT,
    FOREIGN KEY (child_id) REFERENCES child(id)
);

CREATE TABLE announcement (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    date DATE,
    users_id INT,
    FOREIGN KEY (users_id) REFERENCES users(id)
);

CREATE TABLE upload (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    users_id INT,
    FOREIGN KEY (users_id) REFERENCES users(id)
);

CREATE TABLE users_todo (
    user_id INT,
    todo_id INT,
    PRIMARY KEY (user_id, todo_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (todo_id) REFERENCES todo(id)
);

INSERT INTO 
users (
    email,
    password
)
VALUES (
    "tata@tata.com",
    "$argon2id$v=19$m=65536,t=3,p=4$4d2PFFxtsKgGBej3eniM3A$BJJf55bFVWU9j35+6PwMKotFttddi2UZSXdZupWLSpY"
);