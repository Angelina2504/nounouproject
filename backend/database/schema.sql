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
                      gender ENUM('F', 'M', 'O'),
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
                       gender ENUM('F', 'M', 'O'),
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
                      date DATETIME
);


CREATE TABLE child (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       firstname VARCHAR(255),
                       lastname VARCHAR(255),
                       birthdate DATE,
                       gender ENUM('F', 'M', 'O'),
                       allergy VARCHAR(255),
                       user_id INT,
                       FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE
);

CREATE TABLE emergency_contact (
                                   id INT AUTO_INCREMENT PRIMARY KEY,
                                   firstname VARCHAR(255),
                                   lastname VARCHAR(255),
                                   gender ENUM('F', 'M', 'O'),
                                   relationship VARCHAR(255),
                                   address VARCHAR(255),
                                   phone_number VARCHAR(255)
);

CREATE TABLE announcement (
                              id INT AUTO_INCREMENT PRIMARY KEY,
                              title VARCHAR(255) NOT NULL,
                              description TEXT NOT NULL,
                              date DATETIME,
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
                             PRIMARY KEY (tutor_id, child_id),
                             FOREIGN KEY (child_id) REFERENCES child (id) ON DELETE CASCADE,
                             FOREIGN KEY (tutor_id) REFERENCES tutor (id) ON DELETE CASCADE
);

CREATE TABLE child_emergency_contact (
                                         child_id INT,
                                         contact_id INT,
                                         PRIMARY KEY (child_id, contact_id),
                                         FOREIGN KEY (child_id) REFERENCES child (id) ON DELETE CASCADE
);
