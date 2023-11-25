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
import * as bcrypt from 'bcrypt';
import { CustomConfigService } from '../../config/config.service';
import { UserEntity } from './entities/user.entity';
import { UserResponseMapper } from './user.response.mapper';
import { CreateUserSalonRequestDto } from './dto/request/create-user-salon-request.dto';
import { GetUserDetailsResponse } from 'aws-sdk/clients/codecatalyst';
import { VerificationService } from '../verification/verification.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly customConfigService: CustomConfigService,
    private verificationService: VerificationService,
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
    return await this.userRepository.save(newUser);
  }

  async createUserSalon(
    body: CreateUserSalonRequestDto,
    token: string,
  ): Promise<GetUserDetailsResponse> {
    const extractData = await this.verificationService.decodeToken(token);
    const autosalon = extractData['id'];

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
        autosalon,
        password,
      }),
    );
    return await this.userRepository.save(newUser);
  }

  async getUserById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: {
        publications: true,
      },
    });
    if (!user) {
      throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  async updateUser(id: string, body: UpdateUserRequestDto): Promise<any> {
    const user = await this.userRepository.findOneBy({ id: id });
    if (body.email) {
      throw new UnprocessableEntityException('Email can`t to change');
    }
    const newUser = UserResponseMapper.toUpdateUserId(body);
    this.userRepository.merge(user, newUser);
    const res = await this.userRepository.save(user);
    return UserResponseMapper.toUpdateUserId(res);
  }

  async updateAccountType(
    id: string,
    body: UpdateUserRequestDto,
  ): Promise<any> {
    const user = await this.userRepository.findOneBy({ id: id });
    const newType = UserResponseMapper.toUpdateUserType(body);
    this.userRepository.merge(user, newType);
    const res = await this.userRepository.save(user);
    return UserResponseMapper.toUpdateUserType(res);
  }

  async deleteUser(id: string) {
    // Знаходження користувача
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: {
        publications: true,
      },
    });
    // Перевірка, чи користувач існує
    if (!user) {
      throw new UnprocessableEntityException('User not found');
    }
    user.publications = [];

    await this.userRepository.remove(user);
    return `Delete userName: ${user.userName}`;
  }

  async getAllUsers(): Promise<any> {
    const users = await this.userRepository.find({
      relations: {
        publications: true,
      },
    });
    const userRes = users.map((user) => UserResponseMapper.toGetUserRes(user));
    const res = { total: users.length, users: userRes };
    return res;
  }
}
