## Description

A simple Nestjs app to practice and learn the framework. Can create trainers and pokemons and have them interact with each other. This app uses the official v2 of [PokeAPI](https://pokeapi.co/docs/v2#genders) when dealing with Pokemon. Trainers are custom made.

## Topics Covered

- Creating a new nestjs project via CLI
- Creating multiple Modules/Providers/Controllers and injecting them where needed
- Creating simple GET requests
- Creating GET request and having the service make external API Call using @nestjs/http-client
- Creating POST requests that need a body
- Creating POST requests that require query parameters
- Requests Exception Handling
- Validation Pipes using Zod on incoming DTOs
- Unit testing with JEST on all service and controllers

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

##### [POST] /trainers
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

Sample Response:
```json
{
  "name": "bao",
  "sex": "female",
  "id": 2,
  "pokemon": []
}
```

##### [GET] /trainers

```
[GET] /trainers
```
 Retrieves a list of all trainers

 Same Response: 
 ```json
 [
  {
    "name": "everett",
    "sex": "male",
    "id": 1,
    "pokemon": []
  },
  {
    "name": "bao",
    "sex": "female",
    "id": 2,
    "pokemon": []
  }
]
 ```
##### [GET] /pokemon/:name

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

Sample Response: 
```json
{
  "name": "cyndaquil",
  "type": "fire",
  "level": 1,
  "dexNum": 155,
  "hasTrainer": false,
  "uniqueId": "062ce607-9089-42df-b9cc-0a1e105301e6"
}
```

##### [GET] /pokemon

```
[GET] /pokemon
```

Retrieves a list of all current pokemon in application. Because theres over a thousand pokemon, it is initialized to empty list. You must first find a SPECIFIC pokemon in the following request for it to be added to the list

Sample Response:
```json
[
  {
    "name": "pichu",
    "type": "electric",
    "level": 1,
    "dexNum": 172,
    "hasTrainer": false,
    "uniqueId": "0c64bb05-6bc8-4ae9-b1b1-ff8954042616"
  },
  {
    "name": "cyndaquil",
    "type": "fire",
    "level": 1,
    "dexNum": 155,
    "hasTrainer": false,
    "uniqueId": "062ce607-9089-42df-b9cc-0a1e105301e6"
  }
]
```

##### [POST] /trainers/add-pokemon

```
[POST] /trainers/add-pokemon
```

Adds an existing pokemon instantiated via [GET] /pokemon/:name request to an existing trainer instantiated via [POST] /trainers.

Required Query Parameters - 

**trainerName**: string
**pokemonName**: string

Sample Response
```json
{
  "name": "everett",
  "sex": "male",
  "id": 1,
  "pokemon": [
    {
      "name": "pichu",
      "type": "electric",
      "level": 1,
      "dexNum": 172,
      "hasTrainer": true,
      "uniqueId": "0c64bb05-6bc8-4ae9-b1b1-ff8954042616"
    }
  ]
}
```

Will throw 404 (NotFoundException) if trainerName or pokemonName do not exist in app memory.
Will throw 409 (ConflictException) if pokemon is already assigned to a trainer

##### [POST] /trainers/remove-pokemon

```
[POST] /trainers/remove-pokemon
```

Remove an existing pokemon that a trainer is carrying around.

Required Query Parameters - 

**trainerName**: string
**pokemonName**: string

Sample Response
```json
{
  "name": "everett",
  "sex": "male",
  "id": 1,
  "pokemon": [] // direct result of removing the pokemon added in the previous request.
}
```

Will throw 404 (NotFoundException) if trainerName or pokemonName do not exist in app memory.