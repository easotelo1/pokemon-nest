## Description

A simple Nestjs app to practice the framework. Can create trainers and pokemons and have them interact with each other. This app uses the official v2 of [PokeAPI](https://pokeapi.co/docs/v2#genders) when dealing with Pokemon. Trainers are custom made.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Resource Lists

```
[POST] /trainers

// Takes in a JSON Body with a name and a sex (Male or Female)
{
    "name": string
    "sex": string
}

```


```
[GET] /trainers

// Retrieves a list of all trainers
```