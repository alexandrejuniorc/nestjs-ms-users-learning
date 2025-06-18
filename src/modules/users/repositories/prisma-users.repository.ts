import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { PrismaService } from 'src/modules/global/prisma/prisma.service';

@Injectable()
export class PrismaUsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateUserDto) {
    await this.prismaService.user.create({ data });
  }

  async findAll() {
    return this.prismaService.user.findMany();
  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user) {
      return null;
    }

    return await this.prismaService.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user) {
      return null;
    }

    await this.prismaService.user.delete({ where: { id } });
  }
}
