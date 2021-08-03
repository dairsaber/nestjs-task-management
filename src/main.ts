import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const port = 3000;
  const app = await NestFactory.create(AppModule);

  const serverConfig = config.get('server');
  console.log(`serverConfig`, serverConfig);

  await app.listen(port);
  logger.log(`Application listening on port ${3000}`);
}
bootstrap();
