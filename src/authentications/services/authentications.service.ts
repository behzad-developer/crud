import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateAuthenticationDto } from '../dto/create-authentication.dto';
import { LoginDto } from '../dto/login-request';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationsService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}
  async registration(createAuthenticationDto: CreateAuthenticationDto) {
    const { password, phonenumber, username } = createAuthenticationDto;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.phonenumber=:phonenumber OR user.username=:username', {
        phonenumber,
        username,
      })
      .getOne();
    if (user) {
      throw new ForbiddenException('User Already exists');
    }

    const entity = new UserEntity();
    entity.username = username;
    entity.password = bcrypt.hashSync(password, 10);
    entity.phonenumber = phonenumber;
    const newUser = await this.userRepository.save(entity);
    const token = await this.jwtService.signAsync(
      { id: newUser.id },
      {
        expiresIn: '1h',
        privateKey: 'jwt-secret',
      },
    );
    return {
      token,
      user: newUser,
    };
  }

  async login(dto: LoginDto) {
    const { login, password } = dto;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.phonenumber =:login OR user.username =:login', { login })
      .getOne();
    if (!user) {
      throw new ForbiddenException('User Not Found');
    }
    const passwordCheck = bcrypt.compareSync(password, user.password);
    if (!passwordCheck) {
      throw new ForbiddenException('Password is incorrect');
    }
    return this.jwtService.signAsync(
      { id: user.id },
      {
        expiresIn: '1h',
        privateKey: 'jwt-secret',
      },
    );
  }
}
