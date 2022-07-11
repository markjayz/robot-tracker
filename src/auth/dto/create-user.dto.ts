import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from '@nestjs/class-validator';
import { PrimaryGeneratedColumn, Unique } from 'typeorm';

export class CreateUserDto {
  @PrimaryGeneratedColumn()
  readonly id: string;
  
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @IsNotEmpty()
  created_at: Date;

  @IsOptional()
  updated_at: Date;
}
