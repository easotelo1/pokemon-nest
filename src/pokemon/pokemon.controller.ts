import { Controller, Get, Param } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { pokemon } from './interfaces/pokemon.interface';


@Controller('pokemon')
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService) {}

    @Get()
    findAll(): pokemon[] {
        return this.pokemonService.findAll();
    }

    @Get(':name')
    findOne(@Param('name') name: string) {
        return this.pokemonService.findOne(name);
    }

}