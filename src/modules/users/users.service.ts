import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { PrismaUsersRepository } from './repositories/prisma-users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: PrismaUsersRepository) {}

  async create(user: CreateUserDto) {
    return await this.usersRepository.create(user);
  }

  async findAll() {
    return await this.usersRepository.findAll();
  }

  async update(id: string, data: UpdateUserDto) {
    return await this.usersRepository.update(id, data);
  }

  async delete(id: string) {
    return await this.usersRepository.delete(id);
  }
}
