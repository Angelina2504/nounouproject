-- =======================
-- === Sample Data ===
-- =======================


-- Insert users
INSERT INTO user (email, firstname, lastname, gender, phone_number, address, password, is_admin) VALUES
    -- admin123
    ('admin@admin.fr', 'Anna', 'Bella', 'F', '0123456789', '123 Rue des Administrateurs, Paris', '$argon2id$v=19$m=65536,t=3,p=4$iHeJtlkMAZcA2c7CnTUgrw$AkqBd2kPjSGYIcBvNH6ks9dXVuERIlefiyQ7h2V7EF8', true),
    -- toto1234
    ('toto@toto.fr', 'To', 'To', 'M', '0101010101', '1 Rue de Toto, Totoville', '$argon2id$v=19$m=65536,t=3,p=4$h79BAc8O2nuketsfbfPKGg$10uOm9o+4XbpKIbT9TXwPlTX/ZQEXzb2XHDj+GwpVVw', false),
    -- password123
    ('jean.durand@example.com', 'Jean', 'Durand', 'O', '0987654321', '456 Rue Principale, Lyon', '$argon2id$v=19$m=65536,t=3,p=4$zwLzJFXMkdsj4LQCOkCjaA$EDfA6QoxZaZhYT2F0qMs3ARUjGvc5tSomix+oBtB1K8', false),
    -- password456
    ('claire.martin@example.com', 'Claire', 'Martin', 'F', '1234567890', '789 Avenue de la Liberté, Marseille', '$argon2id$v=19$m=65536,t=3,p=4$WEQVhR2hSrx7PLRkxI+c4g$SmeA/nexk6OD2C7nZfwuouYaxrdfvztvwnSos+2s1BI', false),
    -- password123
    ('beber@example.com', 'Bernard', 'Bernard', 'M', '6543209871', '123 Rue de la Route, Nantes', '$argon2id$v=19$m=65536,t=3,p=4$zwLzJFXMkdsj4LQCOkCjaA$EDfA6QoxZaZhYT2F0qMs3ARUjGvc5tSomix+oBtB1K8', false);

-- Insert tutors
INSERT INTO tutor (email, firstname, lastname, gender, phone_number, address, user_id) VALUES
    ('slefevre@example.com', 'Sophie', 'Lefevre', 'F', '9876543210', '11 Rue des Acacias, Nantes', 2),
    ('pierre.moreau@example.com', 'Pierre', 'Moreau', 'M', '9876543211', '22 Rue des Chênes, Lille', 2),
    ('isaroux987@example.com', 'Isabelle', 'Roux', 'F', '9876543212', '33 Rue des Erables, Strasbourg', 3),
    ('m.fournier@example.com', 'Michel', 'Fournier', 'M', '9876543213', '44 Rue des Pins, Toulouse', 3),
    ('cam-dub@example.com', 'Camille', 'Dubois', 'O', '9876543214', '55 Rue des Peupliers, Nice', 4),
    ('blanc-elodie-pro@example.com', 'Elodie', 'Blanc', 'F', '9876543215', '66 Rue des Bouleaux, Montpellier', 4),
    ('tata@example.com', 'Talula', 'Tormento', 'F', '9548763421', '11 Chemin des Arbres Bleus, Nantes', 5);

-- Insert children
INSERT INTO child (firstname, lastname, birthdate, gender, allergy, user_id) VALUES
    ('Lucas', 'To', '2015-05-20', 'M', 'Arachides', 2),
    ('Emma', 'Durand', '2016-07-22', 'F', 'Gluten', 3),
    ('Chloé', 'Martin', '2017-01-15', 'F', 'Lactose', 4),
    ('Alex', 'Martin', '2014-03-18', 'O', null, 4),
    ('Malo', 'Bernard', '2018-12-05', 'O', 'Oeufs', 5),
    ('Léo', 'Bernard', '2013-08-08', 'M', 'Poussière', 5),
    ('Théo', 'Bernard', '2019-09-10', 'M', 'Pollens', 5),
    ('Inès', 'Bernard', '2020-02-20', 'F', null, 5);

-- Insert emergency contacts
INSERT INTO emergency_contact (firstname, lastname, relationship, address, phone_number) VALUES
    ('Luc', 'Muller', 'Oncle', '100 Rue de l''Urgence, Paris', '5432109876'),
    ('Julie', 'Petit', 'Tante', '200 Avenue de la Sécurité, Lyon', '6543210987'),
    ('René', 'Gauthier', 'Grand-parent', '300 Boulevard des Aînés, Marseille', '7654321098'),
    ('Paul', 'Chevalier', 'Voisin', '400 Allée des Amis, Bordeaux', '8765432109');

-- Insert todos
INSERT INTO todo (title, description, status, date) VALUES
    ('Faire les devoirs', 'Vérifier que les devoirs sont faits', 'pending', '2024-01-01'),
    ('Aller chez le médecin', 'Rendez-vous chez le pédiatre à 15h', 'completed', '2024-01-02'),
    ('Acheter des fournitures', 'Acheter des fournitures scolaires', 'pending', '2024-01-03');

-- Insert announcements
INSERT INTO announcement (title, description, date, user_id) VALUES
    ('Réunion des parents', 'Réunion des parents le vendredi à 18h', '2024-01-10', 2),
    ('Sortie scolaire', 'Sortie au zoo prévue le mois prochain', '2024-02-15', 3),
    ('Nouveaux horaires', 'Les nouveaux horaires de la garderie', '2024-03-20', 4);

-- Insert uploads
INSERT INTO upload (title, user_id) VALUES
    ('Carnet de santé', 2),
    ('Autorisation parentale', 3),
    ('Photo de classe', 4);

-- Insert user-todo relationships
INSERT INTO user_todo (user_id, todo_id) VALUES
    (2, 1),
    (3, 2),
    (4, 3);

-- Insert tutor-child relationships
INSERT INTO tutor_child (tutor_id, child_id) VALUES
    (1, 1), (1, 2),
    (2, 3),
    (3, 4),
    (4, 5),
    (5, 6),
    (6, 7), (6, 8);

-- Insert child-emergency contact relationships
INSERT INTO child_emergency_contact (child_id, contact_id) VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4);
