import { Test } from '@nestjs/testing';
import { HttpClient } from '@nestjs/http-client';
import { NotFoundException } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { jest } from '@jest/globals';

describe('PokemonService', () => {
    let service: PokemonService;

    type PokemonApiResponse = {
    data: {
        name: string;
        id: number;
        types: { type: { name: string } }[];
    };
    };

    const httpMock = {
        get: jest.fn<(url: string) => Promise<PokemonApiResponse>>(),
    };

    beforeEach(async () => { 
        httpMock.get.mockReset();

        const moduleRef = await Test.createTestingModule({ 
            providers: [
                PokemonService,
                { provide: HttpClient, useValue: httpMock },
            ],
        }).compile();

        service = moduleRef.get<PokemonService>(PokemonService);
        service = new PokemonService(httpMock as unknown as HttpClient);
    });

    it('starts w ith an empty encountered list', () => {
        expect(service.findAll()).toEqual([]);
    })

    it('fetches a pokemon from pokeAPI and adds it to the encountered list', async () => {
        httpMock.get.mockResolvedValue({
            data: {
                name: 'pikachu',
                id: 25,
                types: [{ type: { name: 'electric' } }],
            },
        });

        const pokemon = await service.findOne('pikachu');
        expect(pokemon).toEqual({
            name: 'pikachu',
            type: 'electric',
            level: 1,
            dexNum: 25,
            hasTrainer: false,
            uniqueId: expect.any(String),
        });

        expect(service.findAll()).toContain(pokemon);
    });

    it('throws NotFoundException when pokemon is not found', async () => {
        httpMock.get.mockRejectedValue(new Error('Not Found'));

        await expect(service.findOne('unknown')).rejects.toThrow(NotFoundException);
    });

    it('returns an unassigned Pokémon from the encountered list', async () => {
        httpMock.get.mockResolvedValue({
            data: {
            name: 'pikachu',
            id: 25,
            types: [{ type: { name: 'electric' } }],
        },
    });

    const encountered = await service.findOne('pikachu');

    expect(service.getPokemonFromList('pikachu')).toBe(encountered);
  });

    it('throws when the Pokémon is not in the unassigned list', () => {
        expect(() => service.getPokemonFromList('pikachu')).toThrow(
            NotFoundException,
        );
    });

})