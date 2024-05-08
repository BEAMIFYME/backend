import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { DatabaseModule } from './database/database.module';
import { BlogsModule } from './api/blogs/blogs.module';
import { LoggerService } from '@logger/logger';
import { ConfigModule } from "@nestjs/config";


@Module({
  imports: [
      ConfigModule.forRoot({
        envFilePath: ['apps/api/.env'],
        isGlobal: true,
        load: [],
      }),
      DatabaseModule,
      BlogsModule,
  ],
  controllers: [AppController],
  providers: [AppService, LoggerService],
})
export class AppModule {}
