import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRobotDto } from './dto/create-robot.dto';
import { UpdateRobotDto } from './dto/update-robot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RobotRepository } from './robot.respository';
import { Robot } from './entities/robot.entity';

@Injectable()
export class RobotService {
  constructor(
    @InjectRepository(RobotRepository)
    private robotRepository: RobotRepository,
  ) {}

  /**
   * Create Robots
   * @param createRobotDto
   * @returns Robot
   */
  async create(createRobotDto: CreateRobotDto): Promise<Robot> {
    return this.robotRepository.save(createRobotDto);
  }

  /**
   * Find all robots
   * @returns []
   */
  async findAll(): Promise<Robot[]> {
    return await this.robotRepository.find();
  }

  /**
   * Find one by ID
   * @param {number} id
   * @returns Robot
   * @throws NotFoundException
   */
  async findOne(id: number): Promise<Robot | NotFoundException> {
    const robot = await this.robotRepository.findOne({
      where: { id },
    });

    if (robot instanceof Robot) {
      return robot;
    }
    throw new NotFoundException('Robot does not exist');
  }

  /**
   * Update Robot
   * @param {number} id
   * @param updateRobotDto
   * @returns Robot
   * @throws NotFoundException
   */
  async update(id: number, updateRobotDto: UpdateRobotDto): Promise<Robot> {
    const robot = await this.findOne(id);
    return await this.robotRepository.save(
      Object.assign(robot, updateRobotDto),
    );
  }

  /**
   * Delete Robot by ID
   * @param {number} id
   * @returns []
   * @throws NotFoundException
   */
  async remove(id: number) {
    await this.findOne(id);
    return await this.robotRepository.delete({ id });
  }

  /**
   * Add Avatar for Robots
   * @param id
   * @param updateRobotDto
   * @returns Robot
   */
  async updateAvatar(
    id: number,
    updateRobotDto: UpdateRobotDto,
  ): Promise<Robot> {
    const robot = await this.findOne(id);
    return await this.robotRepository.save(
      Object.assign(robot, updateRobotDto),
    );
  }
}
