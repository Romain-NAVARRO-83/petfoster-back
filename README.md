# 🐾 PetFoster Back-End

Bienvenue dans le dépôt back-end de **PetFoster**, une application web visant à faciliter l'accueil temporaire d'animaux abandonnés ou en attente d'adoption. Ce projet a été réalisé dans le cadre du TP DWWM, démontrant les compétences en développement back-end et en déploiement d'applications complètes.

> 🔗 [Lien vers le site web](https://petfoster.fr)

---

## 🚀 À propos du projet

Le back-end de **PetFoster** gère :

- Les opérations CRUD pour les entités principales (animaux, utilisateurs, demandes d'accueil).
- L'authentification et l'autorisation des utilisateurs.
- La communication avec la base de données PostgreSQL.
- L'intégration avec le front-end via une API RESTful.

> 🔗 [Lien vers le dépôt front-end](https://github.com/Romain-NAVARRO-83/petfoster-front)

---

## 🛠️ Stack technique

| Outil / Technologie | Rôle |
|---------------------|------|
| **Node.js**         | Environnement d'exécution JavaScript côté serveur |
| **Express.js**      | Framework web pour Node.js |
| **TypeScript**      | Superset de JavaScript avec typage statique |
| **PostgreSQL**      | SGBD relationnel pour la persistance des données |
| **Docker**          | Conteneurisation de l'application et de la base de données |
| **pnpm**            | Gestionnaire de paquets rapide |
| **Prettier**        | Formatage automatique du code |
| **ESLint**          | Analyse statique du code |

---

## 🌌 Déploiement

Le projet est déployé sur un **VPS personnel** avec les technologies suivantes :

- **Docker** : Orchestration des conteneurs pour l'API et la base de données
- **Nginx** : Proxy inverse pour gérer les redirections
- **Certbot / Let's Encrypt** : Génération automatique de certificats SSL

Ce déploiement assure :

- Une architecture modulaire et scalable
- Une connexion HTTPS sécurisée

---

Merci pour votre intérêt pour ce projet ! 🙌
