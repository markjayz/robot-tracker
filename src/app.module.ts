import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import psqlconfig from 'ormpgsqlconfig';
import { RobotModule } from './robot/robot.module';
import { User } from './user/entities/user.entity';
import { Robot } from './robot/entities/robot.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'markjaysonlomboy',
        password: 'root',
        database: 'robot_tracker',
        entities: [__dirname + '/../**/*.entity.js'] ,
        synchronize: true,
    }
    ),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    RobotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
