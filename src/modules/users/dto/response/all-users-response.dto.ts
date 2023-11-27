import { UserEntity } from '../../entities/user.entity';

export class GetAllUsersResponseDto {
  total: number;
  users: Partial<UserEntity>[];
}
