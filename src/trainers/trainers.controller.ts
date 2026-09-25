import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { TrainersService } from './trainers.service';
import { trainers } from './interfaces/trainers.interface';

@Controller('trainers')
export class TrainersController {
    constructor(private readonly trainersService: TrainersService) {}

    @Post() 
    create(@Body() createTrainerDto: CreateTrainerDto) {
        this.trainersService.create(createTrainerDto);
    }

    @Get()
    findAll(): trainers[] {
        return this.trainersService.findAll();
    }
}