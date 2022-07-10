import { EntityRepository, Repository } from 'typeorm';
import { Robot } from './entities/robot.entity';

@EntityRepository()
export class RobotRepository extends Repository<Robot> {}
