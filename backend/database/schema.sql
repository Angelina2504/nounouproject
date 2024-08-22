DROP TABLE IF EXISTS tutor_child;
DROP TABLE IF EXISTS tutor;
DROP TABLE IF EXISTS user_todo;
DROP TABLE IF EXISTS todo;
DROP TABLE IF EXISTS child_emergency_contact;
DROP TABLE IF EXISTS child;
DROP TABLE IF EXISTS announcement;
DROP TABLE IF EXISTS upload;
DROP TABLE IF EXISTS emergency_contact;
DROP TABLE IF EXISTS user;

CREATE TABLE user (
                      id INT AUTO_INCREMENT PRIMARY KEY,
                      email VARCHAR(255) NOT NULL UNIQUE,
                      firstname VARCHAR(255),
                      lastname VARCHAR(255),
                      phone_number VARCHAR(20),
                      address VARCHAR(255),
                      password VARCHAR(255) NOT NULL,
                      is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE tutor (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       email VARCHAR(255) NOT NULL UNIQUE,
                       firstname VARCHAR(255),
                       lastname VARCHAR(255),
                       phone_number VARCHAR(20),
                       address VARCHAR(255),
                       user_id INT,
                       FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE
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
                       firstname VARCHAR(255),
                       lastname VARCHAR(255),
                       birthdate DATE,
                       allergy VARCHAR(255),
                       user_id INT,
                       FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE
);

CREATE TABLE emergency_contact (
                                   id INT AUTO_INCREMENT PRIMARY KEY,
                                   firstname VARCHAR(255),
                                   lastname VARCHAR(255),
                                   relationship VARCHAR(255),
                                   address VARCHAR(255),
                                   phone_number VARCHAR(255)
);

CREATE TABLE announcement (
                              id INT AUTO_INCREMENT PRIMARY KEY,
                              title VARCHAR(255) NOT NULL,
                              description TEXT NOT NULL,
                              date DATE,
                              user_id INT,
                              FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE
);

CREATE TABLE upload (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        title VARCHAR(255),
                        user_id INT,
                        FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE
);

CREATE TABLE user_todo (
                           user_id INT,
                           todo_id INT,
                           PRIMARY KEY (user_id, todo_id),
                           FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE,
                           FOREIGN KEY (todo_id) REFERENCES todo (id) ON DELETE CASCADE
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
                                         FOREIGN KEY (child_id) REFERENCES child (id) ON DELETE CASCADE
);





INSERT INTO
    user (id, email, firstname, lastname, password, is_admin)
VALUES (
           1,
           "admin@admin.com",
           "ad",
           "min",
           "$argon2id$v=19$m=65536,t=3,p=4$pwXPKdt+vY9URRyJqjZXiw$oLFUj+ZqYsfCTwbDxOx8ePBIxZ9VEQFnY4Nuy6WQ63w", -- admin123
           true
       );

INSERT INTO
    user (id, email, password)
VALUES (
           2,
           "tata@tata.com",
           "$argon2id$v=19$m=65536,t=3,p=4$4d2PFFxtsKgGBej3eniM3A$BJJf55bFVWU9j35+6PwMKotFttddi2UZSXdZupWLSpY"
       );

INSERT INTO
    tutor (
    firstname,
    lastname,
    email,
    phone_number,
    address
)
VALUES (
           "Tu",
           "Teur",
           "tu.teur@tuteur.com",
           "0678361512",
           "3 rue du tuteur 67000 Strasbourg"
       );

INSERT INTO
    child (
    firstname,
    lastname,
    birthdate,
    allergy
)
VALUES (
           "Mi",
           "GNON",
           "1992-04-20",
           "poivron"
       );

INSERT INTO
    emergency_contact (
    firstname,
    lastname,
    relationship,
    address,
    phone_number
)
VALUES (
           "Urg",
           "Ence",
           "friend",
           "3 rue sos 67000 strasbourg",
           "0625234869"
       );

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
           "2024-08-01"
       );

INSERT INTO
    announcement (title, description, date)
VALUES (
           "Noël",
           "gouter avec les parents de 18h à 19h",
           "2024-02-15"
       );

INSERT INTO
    upload (title)
VALUES ("Ordonnance pour Pierre");

INSERT INTO
    tutor_child (tutor_id, child_id)
VALUES (1, 1);

INSERT INTO
    child_emergency_contact (child_id, contact_id)
VALUES (1, 1);

INSERT INTO
    user_todo (user_id, todo_id)
VALUES (1, 1);
