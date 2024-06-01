import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hash = bcrypt.hashSync(createUserDto.password, 10);
    return await this.userRepository.save({
      password: hash,
      phonenumber: createUserDto.phonenumber,
      username: createUserDto.username,
    });
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { password, username, phonenumber } = updateUserDto;
    const entity = new UserEntity({
      id,
      phonenumber,
      username,
    });
    if (password) {
      entity.password = bcrypt.hashSync(password, 10);
    }
    return await this.userRepository.save(entity);
  }

  async remove(id: number) {
    const entity = new UserEntity({
      id,
    });
    return await this.userRepository.remove(entity);
  }
}
