import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateUserSalonDto } from './dto/update-autosalon.dto';
import { CreateAutoSalonRequestDto } from './dto/request/create-autosalon-request.dto';

import * as bcrypt from 'bcrypt';
//import { AuthService } from '../auth/auth.service';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';
import { CustomConfigService } from '../../config/config.service';
import { AutoSalonRepository } from './autosalon.repository';

@Injectable()
export class AutosalonService {
  constructor(
    private readonly autoSalonRepository: AutoSalonRepository,
    /* private readonly authService: AuthService,*/
    private readonly customConfigService: CustomConfigService,
    @InjectRedisClient() private redisClient: RedisClient,
  ) {}

  async createSalon(body: CreateAutoSalonRequestDto) {
    console.log(body);
    const findUser = await this.autoSalonRepository.findOneBy({
      email: body.email,
    });
    if (findUser) {
      throw new BadRequestException('User already exist');
    }
    const password = await bcrypt.hash(body.password, 5);
    const newSalon = await this.autoSalonRepository.save(
      this.autoSalonRepository.create({
        ...body,
        password,
      }),
    );
    return await this.autoSalonRepository.save(newSalon);
  }

  findOne(id: number) {
    return `This action returns a #${id} autosalon`;
  }

  update(id: number, updateAutosalonDto: UpdateUserSalonDto) {
    console.log(updateAutosalonDto);
    return `This action updates a #${id} autosalon`;
  }

  remove(id: number) {
    return `This action removes a #${id} autosalon`;
  }
}
