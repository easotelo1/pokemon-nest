import { Module } from '@nestjs/common';
import { TrainersController } from './trainers.controller.js';
import { TrainersService } from './trainers.service.js';
import { PokemonModule } from '../pokemon/pokemon.module.js';

@Module({
    imports: [PokemonModule],
    controllers: [TrainersController],
    providers: [TrainersService],
})
export class TrainersModule {}