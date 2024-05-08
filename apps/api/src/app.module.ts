import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { DatabaseModule } from './database/database.module';
import { BlogsModule } from './api/blogs/blogs.module';
import { LoggerService } from '@logger/logger';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import databaseConfig from './config/database.config';
import securityConfig from './config/security.config';
import {AuthModule} from "./security/auth/auth.module";
import { UsersModule } from './api/users/users.module';
import { PermitModule } from './security/permit/permit.module';
import {join} from "path";
import {ServeStaticModule} from "@nestjs/serve-static";



@Module({
  imports: [
      ConfigModule.forRoot({
        envFilePath: ['apps/api/.env'],
        isGlobal: true,
        load: [databaseConfig, securityConfig],
          validationSchema: Joi.object({
              // BASIC VALIDATION
              SERVER_ENV: Joi.string()
                  .required()
                  .valid('development', 'production', 'test')
                  .default('development'),
              SERVER_DOMAIN: Joi.string().required(),
              SERVER_PORT: Joi.number().required(),
              ALLOWED_ORIGINS_URL: Joi.string().required(),
              ALLOWED_ORIGINS_LOCAL: Joi.string().required(),
          }),
      }),
      ServeStaticModule.forRoot({
          rootPath: join(__dirname, 'client'),
      }),
      AuthModule,
      UsersModule,
      PermitModule,
      DatabaseModule,
      BlogsModule,
  ],
  controllers: [AppController],
  providers: [AppService, LoggerService],
})
export class AppModule {}
