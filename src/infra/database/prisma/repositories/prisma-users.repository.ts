import { PaginationParams } from '@/core/repositories/pagination-params';
import { UsersRepository } from '@/domain/users/application/repositories/users.repository';
import { User } from '@/domain/users/enterprise/entities/user';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaUserMapper } from '../mappers/prisma-user.mapper';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user);

    await this.prismaService.user.create({ data });
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({ where: { email } });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async findMany({ page }: PaginationParams): Promise<User[]> {
    const users = await this.prismaService.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
      skip: (page - 1) * 20,
    });

    return users.map(PrismaUserMapper.toDomain);
  }

  async save(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user);

    await this.prismaService.user.update({
      where: { id: data.id },
      data,
    });
  }

  async delete(user: User): Promise<void> {
    const data = await this.prismaService.user.findFirst({
      where: { id: user.id.toString() },
    });

    if (!data) {
      return;
    }

    await this.prismaService.user.delete({ where: { id: data.id } });
  }
}
