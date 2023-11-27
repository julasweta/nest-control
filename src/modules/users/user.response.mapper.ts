import { UpdateUserRequestDto } from './dto/request/update-user-request.dto';
import { CreateUserResponseDto } from './dto/response/create-user-response.dto';
import { GetUserResponseDto } from './dto/response/get-user-id-response.dto';
import { GetUserSalonResponseDto } from './dto/response/get-user-id-salon-response';
import { UserEntity } from './entities/user.entity';
import { UserBaseDto } from './dto/user.base.dto';

export class UserResponseMapper {
  static toCreatesRes(data: UserEntity): CreateUserResponseDto {
    return {
      id: data.id,
      createdAt: data.createdAt,
    };
  }

  static toGetUserIdRes(data: UserEntity): GetUserResponseDto {
    return {
      id: data.id,
      createdAt: data.createdAt,
      userName: data.userName,
      email: data.email,
      role: data.role,
      accountType: data.accountType,
      phone: data.phone,
    };
  }

  static toGetUserSalonIdRes(
    data: Partial<UserEntity>,
  ): GetUserSalonResponseDto {
    return {
      id: data.id,
      createdAt: data.createdAt,
      userName: data.userName,
      email: data.email,
      role: data.role,
      accountType: data.accountType,
      phone: data.phone,
      autosalon: data.autosalon,
    };
  }

  static toUpdateUserId(data: Partial<UserEntity>): UpdateUserRequestDto {
    return {
      userName: data.userName,
      email: data.email,
      login: data.login,
      password: data.password,
      phone: data.phone,
    };
  }

  static toUpdateUserType(data: Partial<UserBaseDto>): Partial<UserBaseDto> {
    return {
      accountType: data.accountType,
    };
  }

  static toGetUserRes(data: UserEntity): Partial<UserEntity> {
    return {
      id: data.id,
      createdAt: data.createdAt,
      userName: data.userName,
      email: data.email,
      role: data.role,
      accountType: data.accountType,
      phone: data.phone,
    };
  }
}
