import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { PrismaUsersRepository } from './repositories/prisma-users.repository';
import { PubSubService } from '../global/pub-sub/pub-sub.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: PrismaUsersRepository,
    private readonly pubSubService: PubSubService,
  ) {}

  async create(data: CreateUserDto) {
    const user = await this.usersRepository.create(data);

    await this.pubSubService.publish('user-created', user, 'users');

    return user;
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
