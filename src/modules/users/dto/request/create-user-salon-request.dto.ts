import { ApiProperty, PickType } from '@nestjs/swagger';
import { UserBaseDto } from '../user.base.dto';
import { UserRole } from '../../../../common/enum/role.enum';
import { IsEnum } from 'class-validator';

export class CreateUserSalonRequestDto extends PickType(UserBaseDto, [
  'userName',
  'login',
  'password',
  'email',
  'phone',
]) {
  autosalon: string;
  @ApiProperty({
    enum: UserRole,
    default: UserRole.Seller,
  })
  @IsEnum(UserRole, {
    message: 'Invalid role. Choose either "Buyer" or "Seller".',
  })
  role: UserRole;
}
