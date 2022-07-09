import { HttpException, Injectable } from '@nestjs/common';
import { CreateRobotDto } from './dto/create-robot.dto';
import { UpdateRobotDto } from './dto/update-robot.dto';
import { Robot } from './entities/robot.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-identicon-sprites';

@Injectable()
export class RobotsService {

  constructor(
    @InjectRepository(Robot)
    private readonly RobotRepository: Repository<Robot>
  ){}

  create(createRobotDto: CreateRobotDto) {
   return this.RobotRepository.save(createRobotDto);
  }

  findAll() {
    return this.RobotRepository.find();
  }

  async findOne(id: number) {
    const robot = await this.RobotRepository.findOne({
      where: { id },
    });

    if (!robot) {
      const errors = {Robot: ' not found'};
      throw new HttpException({errors}, 401);
    }

    return this.buildRobotReturn(robot);
  }

  async update(id: number, updateRobotDto: UpdateRobotDto) {
    let robot = await this.RobotRepository.findOne({
      where: { id },
    });

    if (!robot) {
      const errors = {Robot: 'not found'};
      throw new HttpException({errors}, 401);
    }

    delete robot.name;
    delete robot.purpose;
    delete robot.is_active;

    let updated = Object.assign(robot, updateRobotDto);
    return await this.RobotRepository.save(updated);
  }

  async remove(id: number) {
    return await this.RobotRepository.delete({id});
  }

  async updateAvatar(id: number, updateRobotDto: UpdateRobotDto) {
    let robot = await this.RobotRepository.findOne({
      where: { id },
    });

    if (!robot) {
      const errors = {Robot: 'not found'};
      throw new HttpException({errors}, 401);
    }

    delete robot.avatar;

    let updated = Object.assign(robot, updateRobotDto);
    return await this.RobotRepository.save(updated);
  }

  private buildRobotReturn(robot: Robot) {
    const robotPayload = {
      id: robot.id,
      name: robot.name,
      purpose: robot.purpose,
      status: robot.is_active,
      avatar: robot.avatar,
      updated_at: robot.updated_at,
    };

    if(robot) {
      return {robot: robotPayload};
    }
    return null;
    
  }
}
