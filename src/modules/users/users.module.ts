import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaUsersRepository } from './repositories/prisma-users.repository';
import { PrismaService } from 'src/modules/global/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, PrismaUsersRepository, PrismaService],
})
export class UsersModule {}
