import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as config from 'config';
import { AppModule } from './app.module';

async function bootstrap() {
  const serverConfig = config.get('server');
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  // cors 控制
  app.enableCors(serverConfig.cors || {});
  logger.log(
    `cors:  origin: ${serverConfig.origin}  methods: ${serverConfig.methods}`,
  );

  // 默认取环境变量里面的信息 没有的话取配置里面的信息
  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);

  logger.log(`Application listening on port ${port}`);
  logger.log(`Application NODE_ENV ${process.env.NODE_ENV}`);
}
bootstrap();
