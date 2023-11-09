import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UpdateUserRequestDto } from './dto/request/update-user-request.dto';
import { CreateUserRequestDto } from './dto/request/create-user-request.dto';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';
import { UserRepository } from './user.repository';
import { AuthService } from '../auth/auth.service';
import * as bcrypt from 'bcrypt';
import { CustomConfigService } from '../../config/config.service';
import { UserEntity } from './entities/user.entity';
import { UserResponseMapper } from './user.response.mapper';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
    private readonly customConfigService: CustomConfigService,
    @InjectRedisClient() private redisClient: RedisClient,
  ) {}

  async createUser(body: CreateUserRequestDto) {
    const findUser = await this.userRepository.findOneBy({
      email: body.email,
    });
    if (findUser) {
      throw new BadRequestException('User already exist');
    }
    const password = await bcrypt.hash(body.password, 5);
    const newUser = await this.userRepository.save(
      this.userRepository.create({
        ...body,
        password,
      }),
    );
    console.log(newUser);
    return await this.userRepository.save(newUser);
  }

  async getUserById(id: string): Promise<UserEntity> {
    console.log('service-id', id);
    const user = await this.userRepository.findOne({
      where: { id: id },
      /*  relations: {
        autosalon: true,
      }, */
    });
    if (!user) {
      throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  async updateUser(id: string, body: UpdateUserRequestDto): Promise<string> {
    const user = await this.userRepository.findOneBy({ id: id });
    if (body.email) {
      throw new UnprocessableEntityException('Email can`t to change');
    }
    const newUser = UserResponseMapper.toUpdateUserId(body);
    this.userRepository.merge(user, newUser);
    const res = await this.userRepository.save(user);
    return res.userName;
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.findOneBy({ id: id });
    await this.userRepository.delete({ id: id });
    if (!user) {
      throw new UnprocessableEntityException('User not found');
    }
    return `Delete userName:  ${user.userName}`;
  }
}
