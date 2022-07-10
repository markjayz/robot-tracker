import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import psqlconfig from 'ormpgsqlconfig';
import { RobotModule } from './robot/robot.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(psqlconfig),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    RobotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
