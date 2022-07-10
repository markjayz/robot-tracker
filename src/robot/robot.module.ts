import { Module } from '@nestjs/common';
import { RobotService } from './robot.service';
import { RobotController } from './robot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvatarService } from './avatar.service';
import { RobotRepository } from './robot.respository';

@Module({
  imports: [
    TypeOrmModule.forFeature([RobotRepository])
  ],
  controllers: [RobotController],
  providers: [RobotService, AvatarService],
})
export class RobotModule {}
