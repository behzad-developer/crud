import { Module } from '@nestjs/common';
import { AuthenticationsService } from 'src/authentications/services/authentications.service';
import { AuthenticationsController } from 'src/authentications/controllers/authentications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secretOrPrivateKey: 'jwt-secret',
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  controllers: [AuthenticationsController],
  providers: [AuthenticationsService, JwtService],
})
export class AuthenticationModule {}
