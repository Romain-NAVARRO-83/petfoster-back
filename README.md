# pet-foster-back

1. Creer son .env
2. lancer la commande ```docker compose -f docker-compose.dev.yml up --build```

HOP-LA !

## Si besoin de reinitialiser les container

1. ```docker rm -v -f $(docker ps -qa)```
2. ```docker compose -f docker-compose.dev.yml up --build```
