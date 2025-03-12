# Utilisation d'une image node plus légère
FROM node:20-alpine

# Mise à jour et installation de rsync
RUN apk add --no-cache rsync

# Définition du répertoire de travail temporaire pour le cache
WORKDIR /usr/src/cache

# Copier uniquement les fichiers nécessaires pour l’installation des dépendances
COPY package.json pnpm-lock.yaml ./

# Installer pnpm et les dépendances
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Définition du répertoire de travail final
WORKDIR /usr/src/app

# Copier le reste des fichiers après l'installation des dépendances
COPY . .

# Exposer le port
EXPOSE 80

# Commande de démarrage
CMD ["pnpm", "run", "start"]
