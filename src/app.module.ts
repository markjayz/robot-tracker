import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RobotsModule } from './robots/robots.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import psqlconfig from 'ormpgsqlconfig';

@Module({
  imports: [
    RobotsModule,
    TypeOrmModule.forRoot(psqlconfig),
    ConfigModule.forRoot({ isGlobal: true }),
    RobotsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
