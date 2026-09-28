import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { trainers } from './interfaces/trainers.interface';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { PokemonService } from '../pokemon/pokemon.service';

@Injectable()
export class TrainersService {
    constructor(private readonly pokemonService: PokemonService) {}
    private readonly trainers: trainers[] = [];

    create(createTrainerDto: CreateTrainerDto): trainers {
        const nameExists = this.trainers.some(trainer => trainer.name === createTrainerDto.name);
        if(nameExists) {
            throw new ConflictException(`Trainer with name ${createTrainerDto.name} already exists.`);
        }
        
        const newTrainer: trainers = {
            name: createTrainerDto.name,
            sex: createTrainerDto.sex,
            id: this.trainers.length + 1,
            pokemon: []
        };

        this.trainers.push(newTrainer);
        return newTrainer;
    }

    findAll(): trainers[] {
        return this.trainers;
    }

    addPokemonToTrainer(trainerName: string, pokemonName: string): trainers {
        const trainer = this.trainers.find(trainer => trainer.name === trainerName);
        if (!trainer) {
            throw new NotFoundException(`Trainer with name ${trainerName} does not exist.`);
        }

        const pokemon = this.pokemonService.getPokemonFromList(pokemonName);
        if (pokemon.hasTrainer) {
            throw new ConflictException(`All encountered ${pokemonName}s have been assigned to a trainer.`);
        }

        trainer.pokemon.push(pokemon);
        pokemon.hasTrainer = true;

        return trainer;
    }

    removePokemonFromTrainer(trainerName: string, pokemonName: string): trainers {
        const trainer = this.trainers.find(trainer => trainer.name === trainerName);
        if (!trainer) {
            throw new NotFoundException(`Trainer with name ${trainerName} does not exist.`);
        }

        const pokemonIndex = trainer.pokemon.findIndex(pokemon => pokemon.name === pokemonName);
        if (pokemonIndex === -1) {
            throw new NotFoundException(`Trainer ${trainerName} does not have a ${pokemonName}.`);
        }

        const [removedPokemon] = trainer.pokemon.splice(pokemonIndex, 1);
        removedPokemon.hasTrainer = false;

        return trainer;
    }
}