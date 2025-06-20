import { DatabaseModule } from '@/infra/database/database.module';
import { Module } from '@nestjs/common';
import { CreateUserController } from './create-user.controller';
import { UpdateUserController } from './update-user.controller';
import { DeleteUserController } from './delete-user.controller';
import { CreateUserUseCase } from '@/domain/users/application/use-cases/create-user.use-case';
import { FetchUsersController } from './fetch-users.controller';
import { UpdateUserUseCase } from '@/domain/users/application/use-cases/update-user.use-case';
import { FetchUsersUseCase } from '@/domain/users/application/use-cases/fetch-users.use-case';
import { DeleteUserUseCase } from '@/domain/users/application/use-cases/delete-user.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateUserController,
    UpdateUserController,
    FetchUsersController,
    DeleteUserController,
  ],
  providers: [
    CreateUserUseCase,
    UpdateUserUseCase,
    FetchUsersUseCase,
    DeleteUserUseCase,
  ],
})
export class UsersModule {}
