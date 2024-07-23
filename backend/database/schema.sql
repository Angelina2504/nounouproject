
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
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