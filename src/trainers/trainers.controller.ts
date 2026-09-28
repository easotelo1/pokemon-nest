import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateTrainerDto, CreateTrainerSchema } from './dto/create-trainer.dto';
import { TrainersService } from './trainers.service';
import { trainers } from './interfaces/trainers.interface';

@Controller('trainers')
export class TrainersController {
    constructor(private readonly trainersService: TrainersService) {}

    @Post() 
    create(@Body({ schema: CreateTrainerSchema }) createTrainerDto: CreateTrainerDto): trainers {
        return this.trainersService.create(createTrainerDto);
    }

    @Get()
    findAll(): trainers[] {
        return this.trainersService.findAll();
    }

    @Post('add-pokemon')
    addPokemonToTrainer(@Query('trainerName') trainerName: string, @Query('pokemonName') pokemonName: string): trainers {
        return this.trainersService.addPokemonToTrainer(trainerName, pokemonName);
    }

    @Post('remove-pokemon')
    removePokemonFromTrainer(@Query('trainerName') trainerName: string, @Query('pokemonName') pokemonName: string): trainers {
        return this.trainersService.removePokemonFromTrainer(trainerName, pokemonName);
    }
}