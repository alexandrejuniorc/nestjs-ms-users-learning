import { PaginationParams } from '@/core/repositories/pagination-params';
import { UsersRepository } from '@/domain/users/application/repositories/users.repository';
import { User } from '@/domain/users/enterprise/entities/user';

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async create(user: User): Promise<void> {
    this.items.push(user);
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id.toString() === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async findMany({ page }: PaginationParams): Promise<User[]> {
    const PER_PAGE = 20;

    const users = this.items.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    return users;
  }

  async save(user: User): Promise<void> {
    const questionIndex = this.items.findIndex((item) => item.id === user.id);

    if (questionIndex >= 0) {
      this.items[questionIndex] = user;
    }
  }

  async delete(user: User): Promise<void> {
    const questionIndex = this.items.findIndex((item) => item.id === user.id);

    if (questionIndex >= 0) {
      this.items.splice(questionIndex, 1);
    }
  }
}
