import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { RobotsService } from './robots.service';
import { CreateRobotDto } from './dto/create-robot.dto';
import { UpdateRobotDto } from './dto/update-robot.dto';
import { AvatarService } from './avatar.service';

@Controller('robots')
export class RobotsController {
  
  constructor(private readonly robotsService: RobotsService, private readonly avatarService: AvatarService) {}

  @Post()
  create(@Body() createRobotDto: CreateRobotDto) {
    return this.robotsService.create(createRobotDto);
  }

  @Get()
  findAll() {
    return this.robotsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.robotsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRobotDto: UpdateRobotDto) {
    return this.robotsService.update(+id, updateRobotDto);
  }

  @Patch('avatar/:id')
  updateAvatar(@Param('id') id: string, @Body() updateRobotDto: UpdateRobotDto) {
    return this.robotsService.updateAvatar(+id, updateRobotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.robotsService.remove(+id);
  }

  @Post('avatar')
  generateAvatar() {
    return this.avatarService.generateAvatar();
  }
}
