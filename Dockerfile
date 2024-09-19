# Dockerfile qui sert à lancer l'environnement
# Node.js pour le développement de façon à ce
# toute l'équipe utilise le même environnement

# Depuis l'image Node de dockerhub version 20
FROM node:20

RUN apt-get update -y
RUN apt-get install -y rsync

WORKDIR /usr/src/cache

# Recuperer le package.json pour la commande 'pnpm i'
COPY ./package.json ./
COPY ./pnpm-lock.yaml ./

# Installer pnpm
RUN npm install -g pnpm
RUN pnpm i

# Definir le repertoir de travail
WORKDIR /usr/src/app

# Copier le contenu du repertoire racine local dans le répertoire racine du container
COPY ./ ./

# Exposer le port pour pouvoir acceder au container depuis l'explorateur
# EXPOSE 3000

# Commande à effectuer pour initialiser le container (Ici : 'pnpm run dev')
CMD [ "pnpm", "run", "dev" ]