import { PartialType } from '@nestjs/mapped-types';
import { LoginRequestDto } from './login-request.dto';

export class UpdateAuthDto extends PartialType(LoginRequestDto) {}
