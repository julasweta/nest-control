import { PickType } from '@nestjs/swagger';
import { UserBaseDto } from '../../../users/dto/user.base.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserSalonRequestDto extends PickType(UserBaseDto, [
  'userName',
  'login',
  'password',
  'email',
  'phone',
  'role',
  'autosalon',
]) {
  @IsNumber()
  @IsNotEmpty()
  autosalonId: number;
}
