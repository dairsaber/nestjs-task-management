import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import * as config from 'config';

const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.MYSQL_HOST || dbConfig.host,
  port: process.env.MYSQL_PORT || dbConfig.port,
  username: process.env.MYSQL_USERNAME || dbConfig.username,
  password: process.env.MYSQL_PASSWORD || dbConfig.password,
  database: process.env.MYSQL_DATABASE || dbConfig.database,
  entities: [join(__dirname, '../', '**', '*.entity.{ts,js}')],
  synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
};
