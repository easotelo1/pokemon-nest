import { Test } from '@nestjs/testing';
import { jest } from '@jest/globals';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import type { pokemon } from './interfaces/pokemon.interface';

describe('PokemonController', () => {
    let controller: PokemonController;

    const pokemonServiceMock = {
        findAll: jest.fn<() => pokemon[]>(),
        findOne: jest.fn<(name: string) => Promise<pokemon>>(),
    };

    beforeEach(async () => {
        jest.clearAllMocks();

        const moduleRef = await Test.createTestingModule({
            controllers: [PokemonController],
            providers: [
                { provide: PokemonService, useValue: pokemonServiceMock },
            ],
        }).compile();

        controller = moduleRef.get<PokemonController>(PokemonController);
    });

    it('returns all encountered Pokémon from the service', () => {
        const encounteredPokemon: pokemon[] = [
            {
                name: 'pikachu',
                type: 'electric',
                level: 1,
                dexNum: 25,
                hasTrainer: false,
                uniqueId: 'test-id',
            },
        ];
        pokemonServiceMock.findAll.mockReturnValue(encounteredPokemon);

        expect(controller.findAll()).toBe(encounteredPokemon);
        expect(pokemonServiceMock.findAll).toHaveBeenCalledTimes(1);
    });

    it('passes the name to the service and returns its result', async () => {
        const encounteredPokemon: pokemon = {
            name: 'pikachu',
            type: 'electric',
            level: 1,
            dexNum: 25,
            hasTrainer: false,
            uniqueId: 'test-id',
        };
        pokemonServiceMock.findOne.mockResolvedValue(encounteredPokemon);

        await expect(controller.findOne('pikachu')).resolves.toBe(
            encounteredPokemon,
        );
        expect(pokemonServiceMock.findOne).toHaveBeenCalledWith('pikachu');
    });
});