BEGIN;

-- Alimentation de la table "species" avec les NAC les plus adoptés
INSERT INTO "species" ("name") VALUES 
('Chat'),
('Chien'),
('Cheval'),
('Lapin'),
('Cochon d''Inde'),
('Hamster'),
('Furet'),
('Oiseau'),
('Serpent'),
('Lézard'),
('Tortue'),
('Rat');

-- Alimentation de la table "users" avec 2 utilisateurs pour chaque type
INSERT INTO "users" ("type_user", "name", "email", "password", "country", "zip", "city", "longitude", "latitude", "phone", "address", "website", "description") VALUES
-- Adoptants
('adoptant', 'Alice Dupont', 'alice.dupont@example.com', 'hashed_password1', 'France', 75001, 'Paris', 2.3522, 48.8566, '0123456789', '1 Rue de Rivoli', 'www.alicedupont.com', 'Grande passionnée des animaux, en particulier des chats.'),
('adoptant', 'Marie Dubois', 'marie.dubois@example.com', 'hashed_password3', 'France', 33000, 'Bordeaux', -0.5792, 44.8378, '0123456791', '3 Cours de l’Intendance', 'www.mariedubois.com', 'Adoptante expérimentée, elle possède déjà plusieurs animaux.'),

-- Familles d'accueil
('famille d''accueil', 'Jean Martin', 'jean.martin@example.com', 'hashed_password2', 'France', 69001, 'Lyon', 4.8357, 45.7640, '0123456790', '2 Rue des Capucins', NULL, 'Habitué à accueillir des animaux de toutes tailles.'),
('famille d''accueil', 'Paul Durant', 'paul.durant@example.com', 'hashed_password4', 'France', 31000, 'Toulouse', 1.4442, 43.6047, '0123456792', '4 Allée Jean Jaurès', NULL, 'Amoureux des chiens et spécialisé dans leur éducation.'),

-- Associations
('association', 'Société Protectrice des Animaux', 'contact@spa-example.com', 'hashed_password5', 'France', 75010, 'Paris', 2.3574, 48.8635, '0123456794', '10 Avenue de la République', 'www.spa-example.com', 'La SPA est une des plus grandes associations de protection animale en France.'),
('association', 'Refuge Animalier', 'contact@refuge-example.com', 'hashed_password6', 'France', 67000, 'Strasbourg', 7.7521, 48.5734, '0123456795', '20 Rue de la Gare', 'www.refuge-example.com', 'Refuge dédié aux animaux abandonnés et maltraités dans l’est de la France.');

-- Alimentation de la table "animals" avec 2 chiens, 2 chats, 2 chevaux, et 1 NAC de chaque
INSERT INTO "animals" ("name", "date_of_birth", "sexe", "race", "short_story", "long_story", "health", "species_id", "creator_id") VALUES
-- Chats
('Mimi', '2024-06-10', 'F', 'Persan', 'Chat très affectueux', 'Mimi est un chat calme et aimant, parfait pour une famille.', 'Bonne santé', 1, 1),
('Felix', '2020-08-12', 'M', 'Siamois', 'Chat très joueur', 'Felix adore jouer et est très curieux.', 'Stérilisé', 1, 2),

-- Chiens
('Rex', '2019-08-22', 'M', 'Berger Allemand', 'Chien protecteur', 'Rex est un chien courageux, idéal pour la garde.', 'Vacciné', 2, 3),
('Belle', '2018-04-13', 'F', 'Labrador', 'Chien joueur', 'Belle adore jouer et est très sociable avec les enfants.', 'Stérilisée', 2, 4),

-- Chevaux
('Gringo', '2020-03-05', 'M', 'Shetland', 'Petit poney très doux', 'Gringo est un poney parfait pour l’initiation des enfants.', 'En pleine forme', 3, 5),
('Storm', '2017-07-19', 'M', 'Frison', 'Cheval élégant', 'Storm est un cheval majestueux, parfait pour les compétitions.', 'Bonne santé', 3, 6),

-- NACs
('Fidji', '2022-11-20', 'M', 'Lapin Nain', 'Lapin adorable', 'Fidji est très curieux et adore les câlins.', 'Vacciné', 4, 1),
('Coco', '2021-01-15', 'F', 'Cochon d''Inde', 'Petit rongeur affectueux', 'Coco est très sociable et adore être manipulé.', 'En bonne santé', 5, 2),
('Speedy', '2020-10-10', 'M', 'Hamster Doré', 'Petit et rapide', 'Speedy est très actif et adore courir dans sa roue.', 'Bonne santé', 6, 3),
('Sly', '2019-05-25', 'M', 'Furet Albinos', 'Furet joueur', 'Sly est un furet intelligent et joueur, parfait pour les amateurs.', 'Vacciné', 7, 4),
('Kiki', '2021-03-30', 'F', 'Perruche', 'Oiseau chanteur', 'Kiki est une perruche colorée qui aime chanter.', 'Bonne santé', 8, 5),
('Slytherin', '2018-08-01', 'M', 'Python Royal', 'Serpent calme', 'Slytherin est un serpent idéal pour les débutants.', 'En pleine santé', 9, 6),
('Leo', '2020-02-14', 'M', 'Gecko Léopard', 'Petit lézard fascinant', 'Leo est un gecko qui adore grimper et explorer.', 'En bonne santé', 10, 1),
('Speedy', '2019-12-21', 'M', 'Tortue de Terre', 'Tortue lente et paisible', 'Speedy est une tortue facile à entretenir.', 'En bonne santé', 11, 2),
('Splinter', '2021-09-07', 'M', 'Rat Domestique', 'Rat intelligent et sociable', 'Splinter est un rat curieux qui adore interagir avec les humains, et les tortues...', 'En bonne santé', 12, 3);

-- Alimentation de la table "animals_has_users" 
INSERT INTO "animals_has_users" ("animals_id", "users_id", "date_start", "date_end") VALUES
(1, 5, '2023-01-01', '2023-06-01'),
(2, 5, '2023-02-15', NULL),
(3, 6, '2023-03-10', '2023-08-10'),
(4, 5, '2023-04-20', NULL),
(5, 6, '2023-05-25', NULL),
(6, 6, '2023-06-30', NULL),
(7, 5, '2023-07-15', NULL),
(8, 6, '2023-08-20', NULL),
(9, 5, '2023-09-05', NULL),
(10, 5, '2023-09-25', NULL),
(11, 5, '2023-10-10', NULL),
(12, 6, '2023-10-30', NULL);

-- Alimentation de la table "animals_pictures" 
INSERT INTO "animals_pictures" ("URL_picture", "animals_id") VALUES
('1-Mimi-1.webp', 1),
('1-Mimi-2.webp', 1),

('2-Felix-1.webp', 2),
('2-Felix-2.webp', 2),

('3-Rex-1.webp', 3),
('3-Rex-2.webp', 3),

('4-Belle-1.webp', 4),
('4-Belle-2.webp', 4),

('5-Gringo-1.webp', 5),
('5-Gringo-2.webp', 5),

('6-Storm-1.webp', 6),

('7-Fidji-1.webp', 7),
('7-Fidji-2.webp', 7),

('8-Coco-1.webp', 8),
('8-Coco-2.webp', 8),

('9-Speedy-1.webp', 9),
('9-Speedy-2.webp', 9),

('10-Sly-1.webp', 10),

('11-Kiki-1.webp', 11),
('11-Kiki-2.webp', 11),

('12-Slytherin-1.webp', 12),

('13-Leo-1.webp', 13),
('13-Leo-2.webp', 13),

('14-Speedy-1.webp', 14),

('15-Splinter-1.webp', 15);

-- Alimentation de la table "messages" 
INSERT INTO "messages" ("sender_id", "receiver_id", "content", "is_read") VALUES
(1, 2, 'Bonjour Marie, je serais intéressée par Felix.', true),
(2, 1, 'Bonjour Alice, Felix est encore disponible pour adoption.', true),
(1, 2, 'Très, bien! Je  voudrais savoir s''il y avait des frais pour l''adoption.', true),
(1, 2, 'Et si oui, à combien s''élèvent-ils?', true),
(2, 1, 'Il faudra participer aux frais de vaccination et de stérilisation, je vous communiquerai tout cela sous peu.', false),
(3, 4, 'Salut Paul, Storm a l''air parfait pour mes enfants.', true),
(4, 3, 'Salut Jean, Storm est vraiment un cheval majestueux.', true),
(3, 4, 'Il est très beau, en effet. Avez-vou prévu un transport dans le cas d''une éventuelle adoption?', true),
(4, 3, 'Malheureusement non, il vous faudra prendre en charge les frais de transports dnas le cas d''une éventuelle adoption.', true),
(4, 3, 'Pourrons-nous convenir d''une visite dès que vous le pourrez, afin de déterminer si votre domicile correspond aux besoin d''un cheval?', false),
(5, 6, 'Bonjour, je voudrais des informations sur Gringo.', true),
(6, 5, 'Bonjour, Gringo est un poney idéal pour les enfants.', true),
(5, 6, 'Génial! Auriez-vous la possibilité de nous montrer davantage de photos?', true),
(5, 6, 'Nous aurions également besoin de savoir s''il peut vitre avec d''autres poneys, chevaux etc..', true),
(6, 5, 'Oui, Gringo est très sociable également avec ses congénères, il n''y a pas de problème.', false);

-- Alimentation de la table "fosterling_profiles" 
INSERT INTO "fosterling_profiles" ("age", "sexe", "quantity", "search_area", "users_id", "species_id") VALUES
('Jeune', 'M', 1, 50, 1, 1),
('Adulte', 'F', 2, 100, 2, 2),
('Jeune', 'M', 1, 50, 3, 3),
('Adulte', 'F', 1, 100, 4, 4),
('Jeune', 'M', 3, 50, 5, 5),
('Adulte', 'F', 1, 100, 6, 6);

-- Alimentation de la table "users_pictures" 
INSERT INTO "users_pictures" ("URL_picture", "users_id") VALUES
('1-Alice Dupont-1.webp', 1),
('2-Marie Dubois-1.webp', 2),
('3-Jean Martin-1.webp', 3),
('3-Jean Martin-2.webp', 3),

('4-Paul Durant-1.webp', 4),
('5-Société Protectrice des Animaux-1.webp', 5),
('5-Société Protectrice des Animaux-2.webp', 5),

('6-Refuge Animalier-1.webp', 6),
('6-Refuge Animalier-2.webp', 6);


-- Alimentation de la table "fosterling_requests"
INSERT INTO "fosterling_requests" ("request_status", "content_request", "animals_id", "users_id") VALUES
('Pending', 'Je souhaiterais adopter Mimi.', 1, 2),
('Approved', 'Demande d’adoption pour Rex approuvée.', 3, 3),
('Rejected', 'Demande d’adoption pour Storm rejetée.', 6, 4);

COMMIT;
