import { ApiProperty, PickType } from '@nestjs/swagger';
import { UserBaseDto } from '../user.base.dto';
import { UserRole } from '../../../../common/enum/role.enum';
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export class CreateUserRequestDto extends PickType(UserBaseDto, [
  'userName',
  'login',
  'password',
  'email',
  'phone',
]) {
  @ApiProperty({
    enum: UserRole,
    default: UserRole.Buyer,
  })
  @IsUserRole({ message: 'Role must be either "buyer" or "seller".' })
  role: UserRole.Buyer | UserRole.Seller;
}

function IsUserRole(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isUserRole',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return value === UserRole.Buyer || value === UserRole.Seller;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be either "Buyer" or "Seller".`;
        },
      },
    });
  };
}
