import { Injectable, NotFoundException } from '@nestjs/common';
import { pokemon } from './interfaces/pokemon.interface';
import { HttpClient } from '@nestjs/http-client';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PokemonService {
    constructor(private readonly http: HttpClient) {}
    
    private readonly pokemon: pokemon[] = [];

    findAll(): pokemon[] {
        return this.pokemon
    }

    async findOne(name: string): Promise<any> {
        try {
            const { data } = await this.http.get<any>(`/pokemon/${name}`);
            const newPokemon = {
                name: data.name,
                type: data.types[0].type.name,
                level: 1,
                dexNum: data.id,
                hasTrainer: false,
                uniqueId: uuidv4()
            };
            this.pokemon.push(newPokemon);
        }
        catch (error) {
            throw new NotFoundException(`Pokemon "${name}" not found`);
        }
    }
}