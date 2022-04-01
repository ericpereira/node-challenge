# Node.js Challenge

Eric Pereira
ericiclone@gmail.com
https://www.linkedin.com/in/eric-pereira-dev/

## Installation

Install the dependencies and start the servers.
Api service:
```sh
cd api-service
npm install
npm start
```
Stock service:
```sh
cd stock-service
npm install
npm start
```

For production environments...
I'm using mongodb for persists data, and to make more easy, i'm share my mongodb credentials and the api secret for jwt. If you prefer, can you change this data.
```sh
API_SECRET=4a2e27b18ef5586f47f7326e817c15e7
DB_USER=root
DB_PASS=29rVwe6U3j9uZ6os
STOCK_SERVICE_URL=http://localhost:3002
```

## Documentation

To access the API documentation, enter the link [http://localhost:3001/docs/](http://localhost:3001/docs/)  after starts the api-service

## Tecnologies
- node v12.22.10
- npm 6.14.16
- JWT
- axios
- express
- swagger 2.0