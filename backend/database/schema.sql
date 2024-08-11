DROP TABLE IF EXISTS user;

CREATE TABLE user (
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
CREATE TABLE emergency_contact (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lastname VARCHAR(255),
    firstname VARCHAR(255),
    relationship VARCHAR(255),
    address VARCHAR(255),
    phone_number VARCHAR(255)
);

CREATE TABLE child (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lastname VARCHAR(255),
    firstname VARCHAR(255),
    birthdate DATE,
    allergy VARCHAR(255),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user (id)
);

CREATE TABLE announcement (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    date DATE,
    users_id INT,
    FOREIGN KEY (users_id) REFERENCES users (id)
);

CREATE TABLE upload (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user (id)
);

CREATE TABLE users_todo (
    user_id INT,
    todo_id INT,
    PRIMARY KEY (user_id, todo_id),
    FOREIGN KEY (user_id) REFERENCES user (id),
    FOREIGN KEY (todo_id) REFERENCES todo (id)
);

CREATE TABLE tutor_child (
    tutor_id INT,
    child_id INT,
    PRIMARY KEY (child_id, tutor_id),
    FOREIGN KEY (child_id) REFERENCES child (id) ON DELETE CASCADE,
    FOREIGN KEY (tutor_id) REFERENCES tutor (id) ON DELETE CASCADE
);

CREATE TABLE child_emergency_contact (
    child_id INT,
    contact_id INT,
    PRIMARY KEY (child_id, contact_id),
    FOREIGN KEY (child_id) REFERENCES child (id) ON DELETE CASCADE,
    FOREIGN KEY (contact_id)
)

INSERT INTO
    users (email, password)
VALUES (
        "tata@tata.com",
        "$argon2id$v=19$m=65536,t=3,p=4$4d2PFFxtsKgGBej3eniM3A$BJJf55bFVWU9j35+6PwMKotFttddi2UZSXdZupWLSpY"
    );

INSERT INTO
    tutor (
        lastname,
        firstname,
        phone_number,
        address
    )
VALUES (
        "Tu",
        "Teur",
        "tu.teur@tuteur.com",
        "0678361512",
        "3 rue du tuteur 67000 Strasbourg"
    )

INSERT INTO
    child (
        lastname,
        firstname,
        birthdate,
        allergy
    )
VALUES (
        "Mi",
        "GNON",
        "25/04/1992",
        "poivron"
    )

INSERT INTO
    emergency_contact (
        lastname,
        firstname,
        relationship,
        adress,
        phone_number
    )
VALUES (
        "Urg",
        "Ence",
        "friend",
        "3 rue sos 67000 strasbourg",
        "0625234869"
    )

INSERT INTO
    todo (
        title,
        description,
        status,
        date
    )
VALUES (
        "Important",
        "prendre les affaires de pluies",
        "pending",
        "01/08/2024"
    )

INSERT INTO
    announcement (title, description, date)
VALUES (
        "Noël",
        "gouter avec les parents de 18h à 19h",
        "15/02/2024"
    )

INSERT INTO
    upload (title)
VALUES ("Ordonnance pour Pierre")

INSERT INTO
    tutor_child (tutor_id, child_id)
VALUES (1, 1)

INSERT INTO
    child_emergency_contact (child_id, contact_id)
VALUES (1, 1)

INSERT INTO
    users_todo (users_id, todo_id)
VALUES (1, 1)