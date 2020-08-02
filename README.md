# Desafio
## initial setup
```sh
# criação do container
docker run --name gostack_postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
# caso ele já exista:
# docker start gostack_postgres

# download de dependências js
yarn

# criação de tabelas
yarn typeorm migration:run
```
## after initial setup
```sh
yarn test --noStackTrace
```
