import { DataSource, DataSourceOptions } from 'typeorm';
import { dbConfig } from './config';

export const AppDataSource = new DataSource({
  ...(dbConfig as DataSourceOptions),
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
});
