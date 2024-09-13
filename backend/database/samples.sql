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
    ('jean.durand@example.com', 'Jean', 'Durand', 'O', '0987654321', '456 Rue Principale, Lyon', '$argon2id$v=19$m=65536,t=3,p=4$iIViHC5llHG07jVfD/PO3g$bb6bcGRu3WQYsmRlVwyoh0QQMiqkfPB/msOx2Ii+JEc', false),
    -- password123
    ('claire.martin@example.com', 'Claire', 'Martin', 'F', '1234567890', '789 Avenue de la Liberté, Marseille', '$argon2id$v=19$m=65536,t=3,p=4$iIViHC5llHG07jVfD/PO3g$bb6bcGRu3WQYsmRlVwyoh0QQMiqkfPB/msOx2Ii+JEc', false),
    -- password123
    ('beber@example.com', 'Bernard', 'Bernard', 'M', '6543209871', '123 Rue de la Route, Nantes', '$argon2id$v=19$m=65536,t=3,p=4$iIViHC5llHG07jVfD/PO3g$bb6bcGRu3WQYsmRlVwyoh0QQMiqkfPB/msOx2Ii+JEc', false);

-- Insert tutors
INSERT INTO tutor (email, firstname, lastname, gender, phone_number, address, user_id) VALUES
    ('slefevre@example.com', 'Sophie', 'Lefevre', 'F', '9876543210', '11 Rue des Acacias, Nantes', 2),
    ('pierre.moreau@example.com', 'Pierre', 'Moreau', 'M', '9876543211', '22 Rue des Chênes, Lille', 2),
    ('isaroux987@example.com', 'Isabelle', 'Roux', 'F', '9876543212', '33 Rue des Erables, Strasbourg', 3),
    ('m.fournier@example.com', 'Michel', 'Fournier', 'M', '9876543213', '44 Rue des Pins, Toulouse', 3),
    ('cam-dub@example.com', 'Camille', 'Dubois', 'O', '9876543214', '55 Rue des Peupliers, Nice', 4),
    ('blanc-elodie-pro@example.com', 'Elodie', 'Blanc', 'F', '9876543215', '66 Rue des Bouleaux, Montpellier', 4),
    ('tata@example.com', 'Talula', 'Tormento', 'F', '9548763421', '11 Chemin des Arbres Bleus, Nantes', 5),
    ('tata2@example.com', 'Theresa', 'Tormento', 'F', '9548763421', '11 Chemin des Arbres Bleus, Nantes', 5),
    ('tata3@example.com', 'Thiffany', 'Tormento', 'F', '9548763421', '11 Chemin des Arbres Bleus, Nantes', 5);

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
INSERT INTO emergency_contact (firstname, lastname, relationship, gender, address, phone_number) VALUES
    ('Luc', 'Muller', 'Oncle', 'M', '100 Rue de l''Urgence, Paris', '5432109876'),
    ('Julie', 'Petit', 'Tante', 'F', '200 Avenue de la Sécurité, Lyon', '6543210987'),
    ('René', 'Gauthier', 'Grand-parent', 'O', '300 Boulevard des Aînés, Marseille', '7654321098'),
    ('Paul', 'Chevalier', 'Voisin',  'M', '400 Allée des Amis, Bordeaux', '8765432109');

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

-- Insert tutor-child relationships (tutors sont rattachés aux enfants de leurs user_id)
INSERT INTO tutor_child (tutor_id, child_id) VALUES
    -- Sophie Lefevre et Pierre Moreau (tutors pour les enfants de Toto, user_id 2)
    (1, 1),  -- Sophie Lefevre -> Lucas
    (2, 1),  -- Pierre Moreau -> Lucas

    -- Isabelle Roux et Michel Fournier (tutors pour les enfants de Jean Durand, user_id 3)
    (3, 2),  -- Isabelle Roux -> Emma

    -- Camille Dubois et Elodie Blanc (tutors pour les enfants de Claire Martin, user_id 4)
    (5, 3),  -- Camille Dubois -> Chloé
    (6, 4),  -- Elodie Blanc -> Alex

    -- Talula Tormento (tutor pour les enfants de Bernard, user_id 5)
    (7, 5),  -- Talula -> Malo
    (7, 6),  -- Talula -> Léo
    (7, 7),  -- Talula -> Théo
    (7, 8),  -- Talula -> Inès
    (8, 7),  -- Theresa -> Théo
    (9, 8);  -- Thiffany -> Inès

-- Insert child-emergency contact relationships (assignation des contacts d'urgence)
INSERT INTO child_emergency_contact (child_id, contact_id) VALUES
    (1, 1),  -- Lucas -> Luc Muller (Oncle)
    (2, 2),  -- Emma -> Julie Petit (Tante)
    (2, 3),  -- Emma -> René Gaithier (Grand-parent)
    (3, 3),  -- Chloé -> René Gauthier (Grand-parent)
    (4, 4);  -- Alex -> Paul Chevalier (Voisin)
