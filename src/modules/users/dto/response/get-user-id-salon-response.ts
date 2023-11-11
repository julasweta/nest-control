import { PickType } from '@nestjs/swagger';
import { UserBaseDto } from '../user.base.dto';

export class GetUserSalonResponseDto extends PickType(UserBaseDto, [
  'id',
  'userName',
  'email',
  'phone',
  'role',
  'accountType',
  'autosalon',
  'createdAt',
]) {}
