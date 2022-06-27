# Node.js REST API for URL shortening

`adflew-shortener-api` contains an example of a Express.js project with database `models` (using Mongoose ODM)

## How to start

Manually clone this repository. Project is ready to run (with some requirements). You need to clone and run:

```sh
$ git clone https://github.com/edgard-mv/adflew-shortener-api.git .
$ npm install
$ npm run build
```

Before executing `npm start`, there is some setup that needs to be done. First we need to create a `.env` file in the root folder with the following variables:

- `API_PORT`: The port in which this app will be serve
- `MONGO_DB_URI`: The database (MongoDB) connection string
- `PASS_PHRASE`: The pass phrase associated with the private key (more on this later)
- `ORIGIN_WHITELIST`: A comma separated list of accepted clients
- `JWT_EXPIRE_TIME`: The expiration time for the generated JSON Web Tokens

## Generating private and public key

This api uses the RS256 algorithm to issue the JWTs, therefore its necessary to place a private and public key in the root folder for this app to run. For testing purposes, we'll use the following command to create the keys:

```
$ openssl genrsa -des3 -out private.pem 2048
```

A pass phrase will be asked, this should be the same located in the environment variable `PASS_PHRASE`. Once done, rename the files as `private.key` and `public.key` respectively.

And we're done!

```
$ npm start
```
