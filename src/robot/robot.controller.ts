import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RobotService } from './robot.service';
import { CreateRobotDto } from './dto/create-robot.dto';
import { UpdateRobotDto } from './dto/update-robot.dto';
import { AvatarService } from './avatar.service';

@Controller('robot')
export class RobotController {
  constructor(
    private readonly robotService: RobotService,
    private readonly avatarService: AvatarService,
  ) {}

  @Post()
  create(@Body() createRobotDto: CreateRobotDto) {
    return this.robotService.create(createRobotDto);
  }

  @Get()
  findAll() {
    return this.robotService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.robotService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRobotDto: UpdateRobotDto) {
    return this.robotService.update(+id, updateRobotDto);
  }

  @Patch('avatar/:id')
  updateAvatar(
    @Param('id') id: string,
    @Body() updateRobotDto: UpdateRobotDto,
  ) {
    return this.robotService.updateAvatar(+id, updateRobotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.robotService.remove(+id);
  }

  @Post('avatar')
  generateAvatar() {
    return this.avatarService.generateAvatar();
  }
}
