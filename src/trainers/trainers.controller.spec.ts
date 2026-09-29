import { Test } from '@nestjs/testing';
import { jest } from '@jest/globals';
import type { pokemon } from '../pokemon/interfaces/pokemon.interface';
import type { CreateTrainerDto } from './dto/create-trainer.dto';
import type { trainers } from './interfaces/trainers.interface';
import { TrainersController } from './trainers.controller';
import { TrainersService } from './trainers.service';

describe('TrainersController', () => {
    let controller: TrainersController;

    const trainersServiceMock = {
        create: jest.fn<(dto: CreateTrainerDto) => trainers>(),
        findAll: jest.fn<() => trainers[]>(),
        addPokemonToTrainer: jest.fn<
            (trainerName: string, pokemonName: string) => trainers
        >(),
        removePokemonFromTrainer: jest.fn<
            (trainerName: string, pokemonName: string) => trainers
        >(),
    };

    const trainerDto: CreateTrainerDto = {
        name: 'Misty',
        sex: 'female',
    };

    const pikachu: pokemon = {
        name: 'pikachu',
        type: 'electric',
        level: 1,
        dexNum: 25,
        hasTrainer: true,
        uniqueId: 'test-id',
    };

    const trainer: trainers = {
        name: 'Misty',
        sex: 'female',
        id: 1,
        pokemon: [pikachu],
    };

    beforeEach(async () => {
        jest.clearAllMocks();

        const moduleRef = await Test.createTestingModule({
            controllers: [TrainersController],
            providers: [
                { provide: TrainersService, useValue: trainersServiceMock },
            ],
        }).compile();

        controller = moduleRef.get<TrainersController>(TrainersController);
    });

    it('passes the DTO to the service when creating a trainer', () => {
        trainersServiceMock.create.mockReturnValue(trainer);

        expect(controller.create(trainerDto)).toBe(trainer);
        expect(trainersServiceMock.create).toHaveBeenCalledWith(trainerDto);
    });

    it('returns all trainers from the service', () => {
        trainersServiceMock.findAll.mockReturnValue([trainer]);

        expect(controller.findAll()).toEqual([trainer]);
        expect(trainersServiceMock.findAll).toHaveBeenCalledTimes(1);
    });

    it('passes both names to the service when adding a Pokémon', () => {
        trainersServiceMock.addPokemonToTrainer.mockReturnValue(trainer);

        expect(controller.addPokemonToTrainer('Misty', 'pikachu')).toBe(trainer);
        expect(trainersServiceMock.addPokemonToTrainer).toHaveBeenCalledWith(
            'Misty',
            'pikachu',
        );
    });

    it('passes both names to the service when removing a Pokémon', () => {
        trainersServiceMock.removePokemonFromTrainer.mockReturnValue(trainer);

        expect(controller.removePokemonFromTrainer('Misty', 'pikachu')).toBe(
            trainer,
        );
        expect(trainersServiceMock.removePokemonFromTrainer).toHaveBeenCalledWith(
            'Misty',
            'pikachu',
        );
    });
});