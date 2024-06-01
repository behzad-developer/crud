import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
config();

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  database: process.env.TYPEORM_DATABASE_NAME,
  host: process.env.TYPEORM_DATABASE_HOST,
  port: Number(process.env.TYPEORM_DATABASE_PORT),
  username: process.env.TYPEORM_DATABASE_USERNAME,
  password: process.env.TYPEORM_DATABASE_PASSWORD,
  synchronize: false,
  entities: ['dist/**/*.entity.js'], // faqat .js fayllarini ko'rsating
  migrations: ['dist/database/migrations/*.js'], // faqat .js fayllarini ko'rsating
};

export default new DataSource(dataSourceOptions);
