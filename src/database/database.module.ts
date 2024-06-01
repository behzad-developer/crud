import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from 'src/cities/entities/city.entity';
import { config } from 'dotenv';
config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.TYPEORM_DATABASE_NAME,
      host: process.env.TYPEORM_DATABASE_HOST,
      port: Number(process.env.TYPEORM_DATABASE_PORT),
      username: process.env.TYPEORM_DATABASE_USERNAME,
      password: process.env.TYPEORM_DATABASE_PASSWORD,
      entities: [CityEntity],
      synchronize: false,
      cache: {
        type: 'redis',
        duration: 60000,
        alwaysEnabled: true,
      },
    }),
  ],
})
export class DatabaseModule {}
