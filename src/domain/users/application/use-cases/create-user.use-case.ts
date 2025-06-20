import { Either, right } from '@/core/either';
import { Injectable } from '@nestjs/common';
import { User } from '../../enterprise/entities/user';
import { UsersRepository } from '../repositories/users.repository';

interface CreateUserUseCaseRequest {
  name: string;
  email: string;
}

type CreateUserUseCaseResponse = Either<null, { user: User }>;

@Injectable()
export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const user = User.create({
      name,
      email,
    });

    await this.usersRepository.create(user);

    return right({ user });
  }
}
