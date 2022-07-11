import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request
} from '@nestjs/common';
import { RobotService } from './robot.service';
import { CreateRobotDto } from './dto/create-robot.dto';
import { UpdateRobotDto } from './dto/update-robot.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('robot')
export class RobotController {
  constructor(
    private readonly robotService: RobotService,
  ) {}

  @Post()
  create(@Body() createRobotDto: CreateRobotDto) {
    return this.robotService.create(createRobotDto);
  }

  @Get()
  findAll(@Request() req) {
    console.log(req);
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
    return this.robotService.generateAvatar();
  }
}
