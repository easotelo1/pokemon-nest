import { Injectable } from '@nestjs/common';
import { trainers } from './interfaces/trainers.interface';
import { CreateTrainerDto } from './dto/create-trainer.dto';

@Injectable()
export class TrainersService {
    private readonly trainers: trainers[] = [];

    create(createTrainerDto: CreateTrainerDto) {
        const newTrainer: trainers = {
            name: createTrainerDto.name,
            sex: createTrainerDto.sex,
            id: this.trainers.length + 1,
        };

        this.trainers.push(newTrainer);
    }

    findAll(): trainers[] {
        return this.trainers;
    }
}