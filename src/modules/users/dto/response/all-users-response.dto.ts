import { PickType } from '@nestjs/swagger';
import { UserBaseDto } from '../user.base.dto';
import { IsOptional } from 'class-validator';

export class GetAllUsersResponseDto extends PickType(UserBaseDto, [
  'userName',
  'email',
  'phone',
  'accountType',
  'createdAt',
  'role',
]) {
  @IsOptional()
  id?: string;
}
