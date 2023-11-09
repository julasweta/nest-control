import { PartialType } from '@nestjs/mapped-types';
import { CreateUserSalonRequestDto } from './request/create-user-salon-request.dto';

export class UpdateUserSalonDto extends PartialType(
  CreateUserSalonRequestDto,
) {}
