## Update "database"

Download JSON file from https://datahub.io/core/s-and-p-500 and replace current file
in `public/data/historical-sp500.json`.

## Digital Ocean Traefic

1. `docker build -t timethemarket/website --file ./Dockerfile .`
2. `docker-compose -f ./docker-compose.yml up -d`
