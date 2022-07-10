import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  /**
   * Create User
   * @param any
   * @returns User
   */
  async create(data: any): Promise<User> {
    const user = await this.userRepository.save(data);
    delete user.password;

    return user;
  }

  /**
   * Login User and Generate token
   * @param data
   * @returns $token
   * @throws BadRequestException
   */
  async login(data: any) {
    const user = await this.userRepository.findOne({
      where:{
        email: data.email
      }
    });

    if (!user) {
      throw new BadRequestException('Invalid Credentials');
    }

    if (!(await bcrypt.compare(data.password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    const jwt = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
      first_name:user.first_name,
      last_name:user.last_name
    });

    return {"access_token" : jwt};
  }
}
