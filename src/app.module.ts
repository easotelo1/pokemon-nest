import { Module } from '@nestjs/common';
import { TrainersController } from './trainers/trainers.controller.js';
import { TrainersService } from './trainers/trainers.service.js';

@Module({
  imports: [],
  controllers: [TrainersController],
  providers: [TrainersService],
})

export class AppModule {}
