import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthenticationsService } from '../services/authentications.service';
import { CreateAuthenticationDto } from '../dto/create-authentication.dto';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/users/current-user';
import { LoginDto } from '../dto/login-request';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserEntity } from 'src/users/entities/user.entity';

@Controller('authentications')
@ApiTags('Auhtentication Controller')
export class AuthenticationsController {
  constructor(
    private readonly authenticationsService: AuthenticationsService,
  ) {}

  @Post('registration')
  registration(@Body() createAuthenticationDto: CreateAuthenticationDto) {
    return this.authenticationsService.registration(createAuthenticationDto);
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authenticationsService.login(body);
  }

  @Post('fake')
  @UseGuards(JwtAuthGuard)
  fake(@CurrentUser() user: UserEntity) {
    return user;
  }
}
