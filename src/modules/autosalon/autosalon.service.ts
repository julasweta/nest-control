import { Injectable } from '@nestjs/common';
import { CreateUserSalonRequestDto } from './dto/request/create-user-salon-request.dto';
import { UpdateUserSalonDto } from './dto/update-autosalon.dto';

@Injectable()
export class AutosalonService {
  createUserSalon(CreateUserSalonRequestDto: CreateUserSalonRequestDto) {
    console.log(CreateUserSalonRequestDto);
    return 'This action adds a new autosalon';
  }

  findAll() {
    return `This action returns all autosalon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} autosalon`;
  }

  update(id: number, updateAutosalonDto: UpdateUserSalonDto) {
    console.log(updateAutosalonDto);
    return `This action updates a #${id} autosalon`;
  }

  remove(id: number) {
    return `This action removes a #${id} autosalon`;
  }
}
