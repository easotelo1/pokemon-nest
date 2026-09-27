import { Module } from '@nestjs/common';
import { HttpClientModule } from '@nestjs/http-client';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';

@Module({
    imports: [
        HttpClientModule.register({
            baseUrl: 'https://pokeapi.co/api/v2/',
            timeout: '5s',
        }),
    ],

    controllers: [PokemonController],
    providers: [PokemonService]
})

export class PokemonModule {}