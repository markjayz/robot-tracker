import {
  BadRequestException,
  HttpException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  /**
   * Create User from signup
   * @param any
   * @returns User
   */
  async create(data: any) {
    const userExist = await this.userRepository.findOne({
      where:{
        email: data.email
      }
    });

    if (userExist) {
      throw new UnprocessableEntityException('Email already exist.');
    }
    const user = await this.userRepository.save(data);
    delete user.password;

    console.log(user);

    return this._generateToken(user);
  }

  /**
   * Login User and Generate access_token
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

    return this._generateToken(user);
  }

  /**
   * Generate Token User
   */
  async _generateToken(user : any){
    const jwt = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
      first_name:user.first_name,
      last_name:user.last_name
    });

    return {"access_token" : jwt};
  }
}
