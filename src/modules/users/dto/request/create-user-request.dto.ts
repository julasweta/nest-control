import { PickType } from '@nestjs/swagger';
import { UserBaseDto } from '../user.base.dto';

export class CreateUserRequestDto extends PickType(UserBaseDto, [
  'userName',
  'login',
  'password',
  'email',
  'phone',
]) {}
