import { ConflictException, Injectable } from '@nestjs/common';
import { trainers } from './interfaces/trainers.interface';
import { CreateTrainerDto } from './dto/create-trainer.dto';

@Injectable()
export class TrainersService {
    private readonly trainers: trainers[] = [];

    create(createTrainerDto: CreateTrainerDto) {
        const nameExists = this.trainers.some(trainer => trainer.name === createTrainerDto.name);
        if(nameExists) {
            throw new ConflictException(`Trainer with name ${createTrainerDto.name} already exists.`);
        }
        
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