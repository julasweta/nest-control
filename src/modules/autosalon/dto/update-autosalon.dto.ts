import { PartialType } from '@nestjs/mapped-types';
import { CreateUserSalonRequestDto } from '../../users/dto/request/create-user-salon-request.dto';

export class UpdateUserSalonDto extends PartialType(
  CreateUserSalonRequestDto,
) {}
