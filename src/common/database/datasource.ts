import { DataSource, DataSourceOptions } from 'typeorm';
import {config} from '../../config/config'

export const connectionSource = new DataSource({
  type: 'mysql',
  host: config.dbHost,
  port: config.dbPort,
  username: config.dbUsername,
  password: config.dbPassword,
  database: config.dbDatabase,
  entities: ['dist/**/**.entity{.ts,.js}'],
  bigNumberStrings:false,
  logging:config.dbLogging,
  synchronize:config.dbSynchronize,
  cli: {
    migrationsDir: 'migrations',
  },
} as DataSourceOptions);