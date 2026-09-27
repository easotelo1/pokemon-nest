import { Module } from '@nestjs/common';
import { TrainersModule } from './trainers/trainers.module.js';
import { PokemonModule } from './pokemon/pokemon.module.js';

@Module({
  imports: [TrainersModule, PokemonModule],
})

export class AppModule {}
