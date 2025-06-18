import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class InMemoryUsersRepository {
  private users: { id: string; name: string; email: string }[] = [];

  create(user: CreateUserDto) {
    this.users.push({ id: crypto.randomUUID(), ...user });
  }

  findAll() {
    return this.users;
  }

  update(id: string, data: UpdateUserDto) {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      return null;
    }

    this.users[index] = { ...this.users[index], ...data };

    return this.users[index];
  }

  delete(id: string) {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      return null;
    }

    this.users.splice(index, 1);
  }
}
