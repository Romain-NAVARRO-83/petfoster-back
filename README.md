# Utilisation Docker

## Initialisation

1. Verifier que l'extension Prettier est installée
2. lancer la commande `docker compose -f docker-compose.dev.yml up --build` (On devrait se retrouver dans l'instace Vite exposant le localhost:5173)
3. Lancer un second terminal et y lancer la commander `docker exec -it 'petfoster-db' bash`; Pour avoir un acces au container contenant la bdd et y lancer des commandes de bases comme `SELECT * FROM animals`.

HOP-LA !

## Installer un nouveau module

1. Dans le terminal permettant d'executer du code dans un container, avant d'executer la commande d'installation de votre module, lancer `pnpm i` puis valider avec `Y`

## Si besoin de reinitialiser les container

1. `docker rm -v -f $(docker ps -qa)`
2. `docker compose -f docker-compose.dev.yml up --build`
