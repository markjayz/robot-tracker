import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from '@nestjs/class-validator';

export class CreateRobotDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  purpose: string;

  @IsBoolean()
  @IsNotEmpty()
  is_active: boolean;

  @IsNotEmpty()
  created_at: Date;

  @IsOptional()
  avatar: string;

  @IsOptional()
  updated_at: Date;
}
