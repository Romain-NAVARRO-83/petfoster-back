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
('adoptant', 'Alice Dupont', 'alice.dupont@example.com', '$argon2id$v=19$m=65536,t=3,p=4$Vv9js13t5L6+iHx/Hni4MA$lxbv+RCoVL/eA4EK8FECpIWutm5sHLuSj8ohUdPaV2M', 'France', 75001, 'Paris', 2.3522, 48.8566, '0123456789', '1 Rue de Rivoli', 'www.alicedupont.com', 'Grande passionnée des animaux, en particulier des chats.'),
('adoptant', 'Marie Dubois', 'marie.dubois@example.com', '$argon2id$v=19$m=65536,t=3,p=4$Vv9js13t5L6+iHx/Hni4MA$lxbv+RCoVL/eA4EK8FECpIWutm5sHLuSj8ohUdPaV2M', 'France', 33000, 'Bordeaux', -0.5792, 44.8378, '0123456791', '3 Cours de l’Intendance', 'www.mariedubois.com', 'Adoptante expérimentée, elle possède déjà plusieurs animaux.'),
('adoptant', 'Claire Lefevre', 'claire.lefevre@example.com', '$argon2id$v=19$m=65536,t=3,p=4$Vv9js13t5L6+iHx/Hni4MA$lxbv+RCoVL/eA4EK8FECpIWutm5sHLuSj8ohUdPaV2M', 'France', 13001, 'Marseille', 5.3698, 43.2965, '0123456787', '10 Rue Saint-Ferréol', NULL, 'Passionnée par les chats et les rongeurs.'),
('adoptant', 'Luc Moreau', 'luc.moreau@example.com', '$argon2id$v=19$m=65536,t=3,p=4$Vv9js13t5L6+iHx/Hni4MA$lxbv+RCoVL/eA4EK8FECpIWutm5sHLuSj8ohUdPaV2M', 'France', 34000, 'Montpellier', 3.8772, 43.6119, '0123456788', '12 Rue de la Loge', NULL, 'Aime les reptiles.'),
('adoptant', 'Lucas Martin', 'lucas.martin@example.com', '$argon2id$v=19$m=65536,t=3,p=4$Vv9js13t5L6+iHx/Hni4MA$lxbv+RCoVL/eA4EK8FECpIWutm5sHLuSj8ohUdPaV2M', 'France', 69002, 'Lyon', 4.8357, 45.7578, '0123456796', '1 Place Bellecour', NULL, 'Amoureux des chats.'),
('adoptant', 'Clara Petit', 'clara.petit@example.com', '$argon2id$v=19$m=65536,t=3,p=4$Vv9js13t5L6+iHx/Hni4MA$lxbv+RCoVL/eA4EK8FECpIWutm5sHLuSj8ohUdPaV2M', 'France', 06000, 'Nice', 7.2619, 43.7102, '0123456797', '1 Promenade des Anglais', NULL, 'Cherche un compagnon canin.'),
('adoptant', 'Victor Hugo', 'victor.hugo@example.com', '$argon2id$v=19$m=65536,t=3,p=4$Vv9js13t5L6+iHx/Hni4MA$lxbv+RCoVL/eA4EK8FECpIWutm5sHLuSj8ohUdPaV2M', 'France', 13001, 'Marseille', 5.3698, 43.2965, '0123456798', '10 Rue de la République', NULL, 'Grand passionné de chevaux.'),
('adoptant', 'Julien Lambert', 'julien.lambert@example.com', '$argon2id$v=19$m=65536,t=3,p=4$Vv9js13t5L6+iHx/Hni4MA$lxbv+RCoVL/eA4EK8FECpIWutm5sHLuSj8ohUdPaV2M', 'France', 57000, 'Metz', 6.1757, 49.1193, '0123456793', '5 Rue des Roches', NULL, 'Grand amateur de chiens.'),
('adoptant', 'Sophie Morel', 'sophie.morel@example.com', '$argon2id$v=19$m=65536,t=3,p=4$Vv9js13t5L6+iHx/Hni4MA$lxbv+RCoVL/eA4EK8FECpIWutm5sHLuSj8ohUdPaV2M', 'France', 82000, 'Montauban', 1.3684, 44.0221, '0123456794', '2 Rue du Collège', NULL, 'Adoptante depuis plusieurs années.'),
('adoptant', 'Lucas Duhamel', 'lucas.duhamel@example.com', '$argon2id$v=19$m=65536,t=3,p=4$Vv9js13t5L6+iHx/Hni4MA$lxbv+RCoVL/eA4EK8FECpIWutm5sHLuSj8ohUdPaV2M', 'France', 38000, 'Grenoble', 5.7245, 45.1885, '0123456795', '8 Rue Emile Laugier', NULL, 'Passionné par les petits animaux.'),
('adoptant', 'Emma Thomas', 'emma.thomas@example.com', '$argon2id$v=19$m=65536,t=3,p=4$Vv9js13t5L6+iHx/Hni4MA$lxbv+RCoVL/eA4EK8FECpIWutm5sHLuSj8ohUdPaV2M', 'France', 31000, 'Toulouse', 1.4442, 43.6047, '0123456796', '12 Rue de Metz', NULL, 'Amoureuse des chats.'),
('adoptant', 'Arthur Lefebvre', 'arthur.lefebvre@example.com', '$argon2id$v=19$m=65536,t=3,p=4$Vv9js13t5L6+iHx/Hni4MA$lxbv+RCoVL/eA4EK8FECpIWutm5sHLuSj8ohUdPaV2M', 'France', 21000, 'Dijon', 5.0415, 47.3220, '0123456797', '3 Boulevard de l''Ouest', NULL, 'Cherche à adopter un chien.'),
('adoptant', 'Manon Renault', 'manon.renault@example.com', '$argon2id$v=19$m=65536,t=3,p=4$Vv9js13t5L6+iHx/Hni4MA$lxbv+RCoVL/eA4EK8FECpIWutm5sHLuSj8ohUdPaV2M', 'France', 92210, 'Saint-Cloud', 2.2097, 48.8441, '0123456798', '5 Parc de la Bérengère', NULL, 'Amatrice de NAC.'),
('adoptant', 'Théo Michel', 'theo.michel@example.com', '$argon2id$v=19$m=65536,t=3,p=4$Vv9js13t5L6+iHx/Hni4MA$lxbv+RCoVL/eA4EK8FECpIWutm5sHLuSj8ohUdPaV2M', 'France', 64000, 'Pau', -0.3708, 43.2951, '0123456799', '10 Boulevard des Pyrénées', NULL, 'Passionné de reptiles.'),
('adoptant', 'Camille Girard', 'camille.girard@example.com', '$argon2id$v=19$m=65536,t=3,p=4$Vv9js13t5L6+iHx/Hni4MA$lxbv+RCoVL/eA4EK8FECpIWutm5sHLuSj8ohUdPaV2M', 'France', 51100, 'Reims', 4.0317, 49.2583, '0123456700', '20 Rue de Venise', NULL, 'Cherche un compagnon fidèle.'),
('adoptant', 'Nathan Lefèvre', 'nathan.lefevre@example.com', '$argon2id$v=19$m=65536,t=3,p=4$Vv9js13t5L6+iHx/Hni4MA$lxbv+RCoVL/eA4EK8FECpIWutm5sHLuSj8ohUdPaV2M', 'France', 37000, 'Tours', 0.6848, 47.3941, '0123456701', '7 Place Jean Jaurès', NULL, 'Adoptant occasionnel.'),
('adoptant', 'Claire Simon', 'claire.simon@example.com', '$argon2id$v=19$m=65536,t=3,p=4$Vv9js13t5L6+iHx/Hni4MA$lxbv+RCoVL/eA4EK8FECpIWutm5sHLuSj8ohUdPaV2M', 'France', 59491, 'Villeneuve d''Ascq', 3.1315, 50.6232, '0123456702', '110 Avenue le Notre', NULL, 'Adore les animaux exotiques.'),

-- Familles d'accueil
('famille d''accueil', 'Jean Martin', 'jean.martin@example.com', '$argon2id$v=19$m=65536,t=3,p=4$Vv9js13t5L6+iHx/Hni4MA$lxbv+RCoVL/eA4EK8FECpIWutm5sHLuSj8ohUdPaV2M', 'France', 69001, 'Lyon', 4.8357, 45.7640, '0123456790', '2 Rue des Capucins', NULL, 'Habitué à accueillir des animaux de toutes tailles.'),
('famille d''accueil', 'Paul Durant', 'paul.durant@example.com', '$argon2id$v=19$m=65536,t=3,p=4$Vv9js13t5L6+iHx/Hni4MA$lxbv+RCoVL/eA4EK8FECpIWutm5sHLuSj8ohUdPaV2M', 'France', 31000, 'Toulouse', 1.4442, 43.6047, '0123456792', '4 Allée Jean Jaurès', NULL, 'Amoureux des chiens et spécialisé dans leur éducation.'),
('famille d''accueil', 'Sylvie Bernard', 'sylvie.bernard@example.com', '$argon2id$v=19$m=65536,t=3,p=4$Vv9js13t5L6+iHx/Hni4MA$lxbv+RCoVL/eA4EK8FECpIWutm5sHLuSj8ohUdPaV2M', 'France', 54000, 'Nancy', 6.1844, 48.6921, '0123456786', '15 Rue Saint-Dizier', NULL, 'Famille habituée aux petits animaux.'),
('famille d''accueil', 'Thomas Richard', 'thomas.richard@example.com', '$argon2id$v=19$m=65536,t=3,p=4$Vv9js13t5L6+iHx/Hni4MA$lxbv+RCoVL/eA4EK8FECpIWutm5sHLuSj8ohUdPaV2M', 'France', 35000, 'Rennes', -1.6778, 48.1173, '0123456799', '18 Rue de la Monnaie', NULL, 'Spécialisé dans l’accueil des oiseaux.'),
('famille d''accueil', 'Sophie Durand', 'sophie.durand@example.com', '$argon2id$v=19$m=65536,t=3,p=4$Vv9js13t5L6+iHx/Hni4MA$lxbv+RCoVL/eA4EK8FECpIWutm5sHLuSj8ohUdPaV2M', 'France', 44000, 'Nantes', -1.5536, 47.2184, '0123456799', '5 Rue Crébillon', NULL, 'Famille habituée à accueillir des NAC.'),
('famille d''accueil', 'Pierre Rolland', 'pierre.rolland@example.com', '$argon2id$v=19$m=65536,t=3,p=4$Vv9js13t5L6+iHx/Hni4MA$lxbv+RCoVL/eA4EK8FECpIWutm5sHLuSj8ohUdPaV2M', 'France', 69003, 'Lyon', 4.8414, 45.7578, '0123456703', '4 Rue de la Part-Dieu', NULL, 'Expérimenté dans l''accueil de chiens.'),
('famille d''accueil', 'Laura Barbier', 'laura.barbier@example.com', '$argon2id$v=19$m=65536,t=3,p=4$Vv9js13t5L6+iHx/Hni4MA$lxbv+RCoVL/eA4EK8FECpIWutm5sHLuSj8ohUdPaV2M', 'France', 13002, 'Marseille', 5.3761, 43.2952, '0123456704', '6 Rue de la République', NULL, 'Spécialisée dans l''accueil de chats.'),
('famille d''accueil', 'Victor Roux', 'victor.roux@example.com', '$argon2id$v=19$m=65536,t=3,p=4$Vv9js13t5L6+iHx/Hni4MA$lxbv+RCoVL/eA4EK8FECpIWutm5sHLuSj8ohUdPaV2M', 'France', 31000, 'Toulouse', 1.4496, 43.6006, '0123456705', '10 Rue Alsace-Lorraine', NULL, 'Habitué à accueillir des NAC.'),
('famille d''accueil', 'Chloé Caron', 'chloe.caron@example.com', '$argon2id$v=19$m=65536,t=3,p=4$Vv9js13t5L6+iHx/Hni4MA$lxbv+RCoVL/eA4EK8FECpIWutm5sHLuSj8ohUdPaV2M', 'France', 75007, 'Paris', 2.3166, 48.8566, '0123456706', '8 Rue de Grenelle', NULL, 'Famille d''accueil pour animaux abandonnés.'),
('famille d''accueil', 'Antoine Muller', 'antoine.muller@example.com', '$argon2id$v=19$m=65536,t=3,p=4$Vv9js13t5L6+iHx/Hni4MA$lxbv+RCoVL/eA4EK8FECpIWutm5sHLuSj8ohUdPaV2M', 'France', 34000, 'Montpellier', 3.8767, 43.6117, '0123456707', '12 Rue Foch', NULL, 'Amoureux des chiens et chats.'),
('famille d''accueil', 'Charlotte Garnier', 'charlotte.garnier@example.com', '$argon2id$v=19$m=65536,t=3,p=4$Vv9js13t5L6+iHx/Hni4MA$lxbv+RCoVL/eA4EK8FECpIWutm5sHLuSj8ohUdPaV2M', 'France', 67000, 'Strasbourg', 7.7521, 48.5734, '0123456708', '2 Rue de la Gare', NULL, 'Amoureuse des NAC.'),
('famille d''accueil', 'Benoît Lefort', 'benoit.lefort@example.com', '$argon2id$v=19$m=65536,t=3,p=4$Vv9js13t5L6+iHx/Hni4MA$lxbv+RCoVL/eA4EK8FECpIWutm5sHLuSj8ohUdPaV2M', 'France', 54000, 'Nancy', 6.1844, 48.6921, '0123456709', '11 Rue Saint-Jean', NULL, 'Spécialisé dans les reptiles.'),
('famille d''accueil', 'Amandine Noël', 'amandine.noel@example.com', '$argon2id$v=19$m=65536,t=3,p=4$Vv9js13t5L6+iHx/Hni4MA$lxbv+RCoVL/eA4EK8FECpIWutm5sHLuSj8ohUdPaV2M', 'France', 75012, 'Paris', 2.3792, 48.8422, '0123456710', '16 Avenue Daumesnil', NULL, 'Accueille des chats et chiens.'),
('famille d''accueil', 'Louis Martin', 'louis.martin@example.com', '$argon2id$v=19$m=65536,t=3,p=4$Vv9js13t5L6+iHx/Hni4MA$lxbv+RCoVL/eA4EK8FECpIWutm5sHLuSj8ohUdPaV2M', 'France', 69006, 'Lyon', 4.8494, 45.7675, '0123456711', '10 Boulevard des Belges', NULL, 'Famille d''accueil de NAC.'),
('famille d''accueil', 'Isabelle Petit', 'isabelle.petit@example.com', '$argon2id$v=19$m=65536,t=3,p=4$Vv9js13t5L6+iHx/Hni4MA$lxbv+RCoVL/eA4EK8FECpIWutm5sHLuSj8ohUdPaV2M', 'France', 31000, 'Toulouse', 1.4442, 43.6047, '0123456712', '6 Rue de la Pomme', NULL, 'Famille d''accueil expérimentée.'),

-- Associations
('association', 'Société Protectrice des Animaux', 'contact@spa-example.com', '$argon2id$v=19$m=65536,t=3,p=4$Vv9js13t5L6+iHx/Hni4MA$lxbv+RCoVL/eA4EK8FECpIWutm5sHLuSj8ohUdPaV2M', 'France', 75010, 'Paris', 2.3574, 48.8635, '0123456794', '10 Avenue de la République', 'www.spa-example.com', 'La SPA est une des plus grandes associations de protection animale en France.'),
('association', 'Refuge Animalier', 'contact@refuge-example.com', '$argon2id$v=19$m=65536,t=3,p=4$Vv9js13t5L6+iHx/Hni4MA$lxbv+RCoVL/eA4EK8FECpIWutm5sHLuSj8ohUdPaV2M', 'France', 67000, 'Strasbourg', 7.7521, 48.5734, '0123456795', '20 Rue de la Gare', 'www.refuge-example.com', 'Refuge dédié aux animaux abandonnés et maltraités dans l’est de la France.'),
('association', 'Les Amis des Animaux', 'contact@amisdesanimaux.com', '$argon2id$v=19$m=65536,t=3,p=4$Vv9js13t5L6+iHx/Hni4MA$lxbv+RCoVL/eA4EK8FECpIWutm5sHLuSj8ohUdPaV2M', 'France', 44000, 'Nantes', -1.5536, 47.2184, '0123456800', '5 Rue du Calvaire', 'www.amisdesanimaux.com', 'Association régionale pour la protection animale.'),
('association', 'Refuge des Montagnes', 'contact@refuge-montagnes.com', '$argon2id$v=19$m=65536,t=3,p=4$Vv9js13t5L6+iHx/Hni4MA$lxbv+RCoVL/eA4EK8FECpIWutm5sHLuSj8ohUdPaV2M', 'France', 74000, 'Annecy', 6.1294, 45.8992, '0123456801', '21 Rue Carnot', 'www.refugemontagnes.com', 'Refuge pour animaux en montagne.'),
('association', 'Association Animaux Heureux', 'contact@animauxheureux.org', '$argon2id$v=19$m=65536,t=3,p=4$Vv9js13t5L6+iHx/Hni4MA$lxbv+RCoVL/eA4EK8FECpIWutm5sHLuSj8ohUdPaV2M', 'France', 75015, 'Paris', 2.2937, 48.8413, '0123456800', '15 Rue de Vaugirard', 'www.animauxheureux.org', 'Association pour le bien-être des animaux.'),
('association', 'Refuge de l''Ouest', 'contact@refugeouest.com', '$argon2id$v=19$m=65536,t=3,p=4$Vv9js13t5L6+iHx/Hni4MA$lxbv+RCoVL/eA4EK8FECpIWutm5sHLuSj8ohUdPaV2M', 'France', 33000, 'Bordeaux', -0.5792, 44.8378, '0123456713', '5 Rue Sainte-Catherine', 'www.refugeouest.com', 'Refuge spécialisé dans les chiens.'),
('association', 'Refuge du Centre', 'contact@refugecentre.com', '$argon2id$v=19$m=65536,t=3,p=4$Vv9js13t5L6+iHx/Hni4MA$lxbv+RCoVL/eA4EK8FECpIWutm5sHLuSj8ohUdPaV2M', 'France', 69001, 'Lyon', 4.8357, 45.7640, '0123456714', '10 Rue Mercière', 'www.refugecentre.com', 'Protection des chats errants.'),
('association', 'Sauvetage NAC', 'contact@sauvetagenac.com', '$argon2id$v=19$m=65536,t=3,p=4$Vv9js13t5L6+iHx/Hni4MA$lxbv+RCoVL/eA4EK8FECpIWutm5sHLuSj8ohUdPaV2M', 'France', 75002, 'Paris', 2.3436, 48.8662, '0123456715', '15 Rue Montmartre', 'www.sauvetagenac.com', 'Spécialisé dans le sauvetage des NAC.'),
('association', 'Refuge des Reptiles', 'contact@refugereptiles.com', '$argon2id$v=19$m=65536,t=3,p=4$Vv9js13t5L6+iHx/Hni4MA$lxbv+RCoVL/eA4EK8FECpIWutm5sHLuSj8ohUdPaV2M', 'France', 13001, 'Marseille', 5.3795, 43.2967, '0123456716', '12 Rue de la République', 'www.refugereptiles.com', 'Les amis des reptiles');

-- Alimentation de la table "animals" avec 2 chiens, 2 chats, 2 chevaux, et 1 NAC de chaque
INSERT INTO "animals" ("name", "date_of_birth", "sexe", "race", "short_story", "long_story", "health", "species_id", "creator_id") VALUES
-- Chats
('Mimi', '2024-06-10', 'F', 'Persan', 'Chat très affectueux', 'Mimi est un chat calme et aimant, parfait pour une famille.', 'Bonne santé', 1, 33),
('Felix', '2020-08-12', 'M', 'Siamois', 'Chat très joueur', 'Felix adore jouer et est très curieux.', 'Stérilisé', 1, 34),
('Luna', '2020-06-21', 'F', 'Sphynx', 'Chat affectueux', 'Luna est une chatte affectueuse, idéale pour la vie en appartement.', 'Stérilisée', 1, 35),
('Oscar', '2019-09-03', 'M', 'Bengal', 'Chat très actif', 'Oscar est un chat joueur et très actif, il adore courir et chasser.', 'Bonne santé', 1, 36),
('Mila', '2023-01-10', 'F', 'Maine Coon', 'Chat doux et calme', 'Mila est une jeune chatte douce, idéale pour les familles.', 'Bonne santé', 1, 38),
('Simba', '2022-11-02', 'M', 'Ragdoll', 'Chat très câlin', 'Simba adore les câlins et cherche une famille aimante.', 'En parfaite santé', 1, 39),
('Miko', '2019-08-27', 'M', 'Chat de gouttière', 'Chat très curieux', 'Miko est un chat très aventurier et qui n''a pas froid aux yeux', 'Un petit problème à la patte droite', 1, 37),
('Charly', '2022-03-15', 'M', 'Chat de gouttière', 'Chat légèrement peureux', 'Charly est un adorable matou qui n''accorde sa confiance qu''aux humains qui le mettent à l''aise', 'En bonne santé', 1, 39),

-- Chiens
('Rex', '2019-08-22', 'M', 'Berger Allemand', 'Chien protecteur', 'Rex est un chien courageux, idéal pour la garde.', 'Vacciné', 2, 33),
('Belle', '2018-04-13', 'F', 'Labrador', 'Chien joueur', 'Belle adore jouer et est très sociable avec les enfants.', 'Stérilisée', 2, 35),
('Rocky', '2020-02-15', 'M', 'Husky Sibérien', 'Chien énergique', 'Rocky est un chien qui adore les longues promenades et les aventures.', 'Bonne santé', 2, 38),
('Bella', '2019-07-12', 'F', 'Golden Retriever', 'Chien fidèle', 'Bella est une chienne douce et très fidèle, parfaite pour les familles.', 'Stérilisée', 2, 34),
('Max', '2021-05-30', 'M', 'Border Collie', 'Chien intelligent', 'Max est un chien très intelligent qui adore apprendre de nouveaux tours.', 'En pleine forme', 2, 36),
('Lily', '2022-09-19', 'F', 'Beagle', 'Chienne joueuse', 'Lily est une jeune chienne pleine d''énergie, idéale pour une famille active.', 'Bonne santé', 2, 35),
('Jack', '2018-12-05', 'M', 'Bulldog Français', 'Chien calme', 'Jack est un chien calme, idéal pour un environnement tranquille.', 'Vacciné', 2, 37),

-- Chevaux
('Gringo', '2020-03-05', 'M', 'Shetland', 'Petit poney très doux', 'Gringo est un poney parfait pour l’initiation des enfants.', 'En pleine forme', 3, 35),
('Storm', '2017-07-19', 'M', 'Frison', 'Cheval élégant', 'Storm est un cheval majestueux, parfait pour les compétitions.', 'Bonne santé', 3, 39),
('Apache', '2019-06-14', 'M', 'Appaloosa', 'Cheval majestueux', 'Apache est un cheval à l''allure élégante, idéal pour les compétitions.', 'Bonne santé', 3, 38),
('Eclipse', '2017-08-07', 'F', 'Pur-sang Arabe', 'Cheval rapide', 'Eclipse est une jument rapide, parfaite pour les courses.', 'Bonne santé', 3, 37),
('César', '2020-09-15', 'M', 'Percheron', 'Cheval robuste', 'César est un cheval de trait puissant, habitué aux travaux agricoles.', 'En pleine forme', 3, 39),
('Nina', '2018-04-23', 'F', 'Frison', 'Cheval élégant', 'Nina est une jument élégante, très appréciée pour les concours de dressage.', 'En pleine santé', 3, 36),
('Spirit', '2019-11-12', 'M', 'Mustang', 'Cheval sauvage', 'Spirit est un cheval fougueux qui a besoin d''espace pour s''épanouir.', 'Vacciné', 3, 34),

-- NACs
('Fidji', '2022-11-20', 'M', 'Lapin Nain', 'Lapin adorable', 'Fidji est très curieux et adore les câlins.', 'Vacciné', 4, 33),
('Coco', '2021-01-15', 'F', 'Cochon d''Inde', 'Petit rongeur affectueux', 'Coco est très sociable et adore être manipulé.', 'En bonne santé', 5, 36),
('Speedy', '2020-10-10', 'M', 'Hamster Doré', 'Petit et rapide', 'Speedy est très actif et adore courir dans sa roue.', 'Bonne santé', 6, 40),
('Sly', '2019-05-25', 'M', 'Furet Albinos', 'Furet joueur', 'Sly est un furet intelligent et joueur, parfait pour les amateurs.', 'Vacciné', 7, 40),
('Kiki', '2021-03-30', 'F', 'Perruche', 'Oiseau chanteur', 'Kiki est une perruche colorée qui aime chanter.', 'Bonne santé', 8, 40),
('Slytherin', '2018-08-01', 'M', 'Python Royal', 'Serpent calme', 'Slytherin est un serpent idéal pour les débutants.', 'En pleine santé', 9, 41),
('Leo', '2020-02-14', 'M', 'Gecko Léopard', 'Petit lézard fascinant', 'Leo est un gecko qui adore grimper et explorer.', 'En bonne santé', 10, 41),
('Speedy', '2019-12-21', 'M', 'Tortue de Terre', 'Tortue lente et paisible', 'Speedy est une tortue facile à entretenir.', 'En bonne santé', 11, 41),
('Splinter', '2021-09-07', 'M', 'Rat Domestique', 'Rat intelligent et sociable', 'Splinter est un rat curieux qui adore interagir avec les humains, et les tortues...', 'En bonne santé', 12, 40),
('Pixie', '2021-12-15', 'F', 'Lapin Nain', 'Lapin câlin', 'Pixie adore se blottir et demande beaucoup d''attention.', 'Bonne santé', 4, 34),
('Tito', '2020-05-30', 'M', 'Cochon d''Inde', 'Petit rongeur curieux', 'Tito est un cochon d''Inde curieux et toujours en mouvement.', 'Bonne santé', 5, 35),
('Whiskers', '2021-03-28', 'M', 'Hamster Russe', 'Petit et rapide', 'Whiskers adore courir et explorer de nouveaux espaces.', 'Bonne santé', 6, 37),
('Shadow', '2019-08-11', 'F', 'Furet', 'Furet joueur', 'Shadow est une furette très active et intelligente, elle adore jouer.', 'Vaccinée', 7, 40),
('Nibbles', '2020-04-04', 'M', 'Gerbille', 'Petit rongeur actif', 'Nibbles adore creuser et construire des tunnels.', 'Bonne santé', 5, 37),
('Polly', '2022-10-01', 'F', 'Perruche', 'Oiseau coloré', 'Polly est une perruche qui adore chanter et interagir avec les humains.', 'Bonne santé', 8, 40),
('Viper', '2018-09-30', 'M', 'Serpent des blés', 'Serpent calme', 'Viper est un serpent facile à manipuler, idéal pour un amateur de reptiles.', 'En pleine santé', 9, 41),
('Spike', '2020-07-25', 'M', 'Iguane Vert', 'Lézard fascinant', 'Spike est un iguane curieux qui aime se prélasser au soleil.', 'En parfaite santé', 10, 41),
('Shell', '2021-02-18', 'F', 'Tortue Hermann', 'Tortue paisible', 'Shell est une tortue calme et facile à entretenir.', 'En bonne santé', 11, 41),
('Tiny', '2019-06-09', 'F', 'Chinchilla', 'Chinchilla doux', 'Tiny est une chinchilla douce et câline, parfaite pour une famille.', 'En pleine santé', 5, 35),
('Gizmo', '2020-08-21', 'M', 'Rat', 'Rat intelligent', 'Gizmo est un rat très intelligent qui adore résoudre des puzzles.', 'En pleine forme', 12, 37),
('Zazu', '2018-07-14', 'M', 'Ara Bleu', 'Oiseau majestueux', 'Zazu est un magnifique ara bleu, très sociable et joueur.', 'Bonne santé', 8, 40),
('Echo', '2021-11-17', 'M', 'Caméléon', 'Lézard coloré', 'Echo est un caméléon qui change de couleurs selon son humeur.', 'En bonne santé', 10, 41),
('Rex', '2020-09-05', 'M', 'Iguane Noir', 'Lézard imposant', 'Rex est un iguane noir impressionnant, très calme et facile à vivre.', 'Bonne santé', 10, 41);

-- Alimentation de la table "animals_has_users" 
INSERT INTO "animals_has_users" ("animals_id", "users_id", "date_start", "date_end") VALUES
(1, 24, '2023-08-12', '2023-06-01'),
(2, 26, '2022-09-26', NULL),
(3, 35, '2024-05-15', '2023-08-10'),
(4, 5, '2021-02-21', NULL),
(5, 11, '2020-05-25', NULL),
(6, 39, '2023-01-16', NULL),
(7, 37, '2022-04-03', NULL),
(8, 39, '2020-08-24', NULL),
(9, 33, '2019-03-01', NULL),
(10, 30, '2023-12-27', NULL),
(11, 8, '2023-02-14', NULL),
(12, 34, '2021-05-02', NULL),
(13, 12, '2021-01-01', NULL),
(14, 32, '2019-11-14', NULL),
(15, 19, '2022-04-27', '2023-07-10'),
(16, 35, '2024-06-30', NULL),
(17, 39, '2019-11-05', NULL),
(18, 7, '2023-07-26', '2023-11-22'),
(19, 18, '2022-03-25', NULL),
(20, 18, '2023-10-29', NULL);


-- Alimentation de la table "animals_pictures" 
INSERT INTO "animals_pictures" ("URL_picture", "animals_id") VALUES
('1-Mimi-1.webp', 1),
('1-Mimi-2.webp', 1),

('2-Felix-1.webp', 2),
('2-Felix-2.webp', 2),

('3-Luna-1.webp', 3),
('3-Luna-2.webp', 3),

('4-Oscar-1.webp', 4),
('4-Oscar-2.webp', 4),

('5-Mila-1.webp', 5),
('5-Mila-2.webp', 5),

('6-Simba-1.webp', 6),
('6-Simba-2.webp', 6),

('7-Miko-1.webp', 7),
('7-Miko-2.webp', 7),

('8-Charly-1.webp', 8),
('8-Charly-2.webp', 8),

('9-Rex-1.webp', 9),
('9-Rex-2.webp', 9),

('10-Belle-1.webp', 10),
('10-Belle-2.webp', 10),

('11-Rocky-1.webp', 11),
('11-Rocky-2.webp', 11),

('12-Bella-1.webp', 12),
('12-Bella-2.webp', 12),

('13-Max-1.webp', 13),
('13-Max-2.webp', 13),

('14-Lily-1.webp', 14),
('14-Lily-2.webp', 14),

('15-Jack-1.webp', 15),
('15-Jack-2.webp', 15),

('16-Gringo-1.webp', 16),
('16-Gringo-2.webp', 16),

('17-Storm-1.webp', 17),

('18-Apache-1.webp', 18),
('18-Apache-2.webp', 18),

('19-Eclipse-1.webp', 19),
('19-Eclipse-2.webp', 19),

('20-César-1.webp', 20),
('20-César-2.webp', 20),

('21-Nina-1.webp', 21),
('21-Nina-2.webp', 21),

('22-Spirit-1.webp', 22),
('22-Spirit-2.webp', 22),

('23-Fidji-1.webp', 23),
('23-Fidji-2.webp', 23),

('24-Coco-1.webp', 24),
('24-Coco-2.webp', 24),

('25-Speedy-1.webp', 25),
('25-Speedy-2.webp', 25),

('26-Sly-1.webp', 26),

('27-Kiki-1.webp', 27),
('27-Kiki-2.webp', 27),

('28-Slytherin-1.webp', 28),

('29-Leo-1.webp', 29),
('29-Leo-2.webp', 29),

('30-Speedy-1.webp', 30),

('31-Splinter-1.webp', 31),

('32-Pixie-1.webp', 32),
('32-Pixie-2.webp', 32),

('33-Tito-1.webp', 33),
('33-Tito-2.webp', 33),

('34-Whiskers-1.webp', 34),
('34-Whiskers-2.webp', 34),

('35-Shadow-1.webp', 35),
('35-Shadow-2.webp', 35),

('36-Nibbles-1.webp', 36),
('36-Nibbles-2.webp', 36),

('37-Polly-1.webp', 37),
('37-Polly-2.webp', 37),

('38-Viper-1.webp', 38),
('38-Viper-2.webp', 38),

('39-Spike-1.webp', 39),
('39-Spike-2.webp', 39),

('40-Shell-1.webp', 40),
('40-Shell-2.webp', 40),

('41-Tiny-1.webp', 41),
('41-Tiny-2.webp', 41),

('42-Gizmo-1.webp', 42),
('42-Gizmo-2.webp', 42),

('43-Zazu-1.webp', 43),
('43-Zazu-2.webp', 43),

('44-Echo-1.webp', 44),
('44-Echo-2.webp', 44),

('45-Rex-1.webp', 45),
('45-Rex-2.webp', 45);

-- Alimentation de la table "messages" 
INSERT INTO "messages" ("sender_id", "receiver_id", "content", "read_by_receiver") VALUES
(1, 2, 'Bonjour Marie, je serais intéressée par Felix.', true),
(2, 1, 'Bonjour Alice, Felix est encore disponible pour adoption.', true),
(1, 2, 'Très, bien! Je  voudrais savoir s''il y avait des frais pour l''adoption.', true),
(1, 2, 'Et si oui, à combien s''élèvent-ils?', true),
(2, 1, 'Il faudra participer aux frais de vaccination et de stérilisation, je vous communiquerai tout cela sous peu.', false),
(1, 4, 'Bonjour! J''aimerais beaucoup rencontrer Storm si c''est possible!', true),
(4, 1, 'Hello! Il est possible de le voir oui, proposez-moi une date', false),
(3, 4, 'Salut Paul, Storm a l''air parfait pour mes enfants.', true),
(4, 3, 'Salut Jean, Storm est vraiment un cheval majestueux.', true),
(3, 4, 'Il est très beau, en effet. Avez-vou prévu un transport dans le cas d''une éventuelle adoption?', true),
(4, 3, 'Malheureusement non, il vous faudra prendre en charge les frais de transports dnas le cas d''une éventuelle adoption.', true),
(4, 3, 'Pourrons-nous convenir d''une visite dès que vous le pourrez, afin de déterminer si votre domicile correspond aux besoin d''un cheval?', false),
(5, 6, 'Bonjour, je voudrais des informations sur Gringo.', true),
(6, 5, 'Bonjour, Gringo est un poney idéal pour les enfants.', true),
(5, 6, 'Génial! Auriez-vous la possibilité de nous montrer davantage de photos?', true),
(5, 6, 'Nous aurions également besoin de savoir s''il peut vitre avec d''autres poneys, chevaux etc..', true),
(6, 5, 'Oui, Gringo est très sociable également avec ses congénères, il n''y a pas de problème.', false),
(1, 2, 'Phrase bidon pour tester un truc', false);


-- Alimentation de la table "fosterling_profiles" 
INSERT INTO "fosterling_profiles" ("age", "sexe", "quantity", "search_area", "users_id", "species_id") VALUES
('-1', 'M', 1, 50, 19, 1),  -- Jean Martin, accueillant des chats
('1-3', 'F', 2, 100, 20, 2),  -- Paul Durant, accueillant des chiens
('3-5', 'M', 1, 50, 21, 3),  -- Sylvie Bernard, accueillant des rongeurs
('5+', 'F', 1, 100, 22, 4),  -- Thomas Richard, accueillant des oiseaux
('-1', 'M', 3, 50, 23, 5),  -- Sophie Durand, accueillant des NAC
('1-3', 'F', 1, 100, 24, 2),  -- Pierre Rolland, accueillant des chiens
('3-5', 'M', 1, 50, 25, 1),  -- Laura Barbier, accueillant des chats
('5+', 'F', 2, 100, 26, 5),  -- Victor Roux, accueillant des NAC
('-1', 'F', 1, 50, 27, 1),  -- Chloé Caron, accueillant des chats abandonnés
('1-3', 'M', 1, 100, 28, 2);  -- Antoine Muller, accueillant des chiens et chats

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
('Pending', 'Je souhaiterais adopter Mimi.', 1, 1), -- Alice Dupont (adoptant)
('Approved', 'Demande d’adoption pour Rex approuvée.', 9, 20), -- Sophie Morel (adoptant)
('Rejected', 'Demande d’adoption pour Storm rejetée.', 12, 7), -- Victor Hugo (adoptant)
('Pending', 'Demande d’accueil pour Gringo.', 12, 21), -- Jean Martin (famille d'accueil)
('Approved', 'Demande d’accueil pour Fidji approuvée.', 25, 26), -- Chloé Caron (famille d'accueil)
('Pending', 'Je souhaiterais adopter Felix.', 2, 3), -- Claire Lefevre (adoptant)
('Rejected', 'Demande d’adoption pour Simba rejetée.', 6, 4), -- Luc Moreau (adoptant)
('Pending', 'Je souhaiterais adopter Jack.', 7, 17), -- Nathan Lefèvre (adoptant)
('Approved', 'Demande d’accueil pour Coco approuvée.', 26, 27), -- Antoine Muller (famille d'accueil)
('Pending', 'Je souhaiterais adopter Rocky.', 10, 10); -- Clara Petit (adoptant)

COMMIT;
