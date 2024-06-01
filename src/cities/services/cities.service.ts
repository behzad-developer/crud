import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCityDto } from '../dto/create-city.dto';
import { UpdateCityDto } from '../dto/update-city.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from '../entities/city.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly citiesRepository: Repository<CityEntity>,
  ) {}

  async create(createCityDto: CreateCityDto): Promise<CityEntity> {
    try {
      const city = this.citiesRepository.create(createCityDto);
      return await this.citiesRepository.save(city);
    } catch (error) {
      console.error('Error creating city:', error);
      throw error;
    }
  }

  async findAll() {
    return await this.citiesRepository.find();
  }

  async findOne(id: number) {
    return await this.citiesRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCityDto: UpdateCityDto) {
    const city = await this.findOne(id);
    if (!city) {
      throw new NotFoundException();
    }
    Object.assign(city, updateCityDto);

    return await this.citiesRepository.save(city);
  }

  async remove(id: number) {
    const city = await this.findOne(id);
    if (!city) {
      throw new NotFoundException();
    }

    return await this.citiesRepository.remove(city);
  }
}
