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
    "name": string,
    "sex": string
}

```

name - unique, case insensitive. Will throw 409 (Conflict Exception) if name already registered
sex - male | female

```
[GET] /trainers
```
 Retrieves a list of all trainers

```
[GET] /pokemon
```

Retrieves a list of all current pokemon in application. Because theres over a thousand pokemon, it is initialized to empty list. You must first find a SPECIFIC pokemon in the following request for it to be added to the list

``` 
[GET] /pokemon/:name

// Instantiates a new simplified pokemon with the following data 

{
    "name": string,
    "type": string,
    "level": number,
    "dexNum": number,
    "hasTrainer": boolean,    // defaults to false
    "uniqueId": string,       // uniqueId to differentiate between duplicate pokemons
}


```

Call interacts with PokeAPI - an unofficial RESTFul API linked to an extensive database of pokemon. If pokemon does not exist in PokeAPI, returns 404. duplicates are allowed (contrary to trainers).
