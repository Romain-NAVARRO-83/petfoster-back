BEGIN;

-- Insertion d'une espèce aléatoire dans la table species
INSERT INTO "species" ("name", "detail", "created_at", "updated_at")
VALUES
('Chien', Null, NOW(), NOW()),
('Chat', Null, NOW(), NOW()),
('NAC', 'Hamster', NOW(), NOW());

-- Insertion d'un utilisateur aléatoire dans la table users
INSERT INTO "users" ("type_user", "name", "email", "password", "country", "zip", "city", "longitude", "latitude", "phone", "address", "website", "created_at", "updated_at")
VALUES
('famille d''accueil', 'Jean Dupont', 'jeandupont@example.com', 'motdepasse123', 'France', 75008, 'Paris', 2.3522, 48.8566, '01-23-45-67-89', '12 Rue de Rivoli', 'http://jeandupont.fr', NOW(), NOW());

-- Insertion d'un animal aléatoire dans la table animals
INSERT INTO "animals" ("name", "date_of_birth", "sexe", "race", "short_story", "long_story", "health", "species_id", "creator_id", "created_at", "updated_at")
VALUES
(
    'Max', 
    '2021-03-15', 
    'M', 
    'Labrador', 
    'Chien amical trouvé près du parc.', 
    'Max est un Labrador très amical qui aime jouer et est très bon avec les enfants. Il a été trouvé près du parc et cherche maintenant un nouveau foyer.', 
    'Bonne santé', 
    (SELECT "id" FROM "species" WHERE "name" = 'Chien' LIMIT 1), 
    (SELECT "id" FROM "users" WHERE "name" = 'Jean Dupont' LIMIT 1), 
    NOW(), 
    NOW()
);

COMMIT;
