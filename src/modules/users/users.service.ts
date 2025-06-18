import { Injectable } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import type { CreateUserDto } from './dtos/create-user.dto';
import type { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  create(user: CreateUserDto) {
    return this.usersRepository.create(user);
  }

  findAll() {
    return this.usersRepository.findAll();
  }

  update(id: string, data: UpdateUserDto) {
    return this.usersRepository.update(id, data);
  }

  delete(id: string) {
    return this.usersRepository.delete(id);
  }
}
