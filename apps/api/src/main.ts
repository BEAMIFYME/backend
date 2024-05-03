import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { setupSwagger } from 'functions/swagger.function';
declare const module: any;
const chalk = require('chalk');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // logger: ['error', 'warn', 'debug'],
    snapshot: true,
    cors: {
      origin:
          process.env.SERVER_ENV === 'production'
              ? process.env.ALLOWED_ORIGINS_URL.split(',')
              : process.env.ALLOWED_ORIGINS_LOCAL.split(','),
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    },
  });
  // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  // V1 PREFIX FOR ALL ROUTES
  const globalPrefix = 'v1';
  app.setGlobalPrefix(globalPrefix);
  if (process.env.SERVER_ENV === 'development') {
    // SWAGGER
    setupSwagger(app);
  }
  // PORT
  const port = process.env.SERVER_PORT || 3021;
  await app.listen(port);

  console.log(
      chalk.greenBright(`Endpoints are running on: http://localhost:${port}/v1`),
  );

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
void bootstrap();
