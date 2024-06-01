import { Module } from '@nestjs/common';
import { CitiesModule } from './cities/cities.module';
import { DatabaseModule } from './database/database.module';
import { AuthenticationModule } from './authentications/authentications.module';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import dataSource from 'src/database/ormconfig/data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSource.options,
      autoLoadEntities: true, // Bu parametrni qo'shib ko'ring
    }),
    UsersModule,
    CitiesModule,
    DatabaseModule,
    AuthenticationModule,
  ],
})
export class AppModule {}
