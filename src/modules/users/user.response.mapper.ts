import { UpdateUserRequestDto } from './dto/request/update-user-request.dto';
import { CreateUserResponseDto } from './dto/response/create-user-response.dto';
import { GetUserResponseDto } from './dto/response/get-user-id-response.dto';
import { UserEntity } from './entities/user.entity';

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

  static toUpdateUserId(data: Partial<UserEntity>): UpdateUserRequestDto {
    return {
      userName: data.userName,
      email: data.email,
      login: data.login,
      password: data.password,
      phone: data.phone,
    };
  }
}
