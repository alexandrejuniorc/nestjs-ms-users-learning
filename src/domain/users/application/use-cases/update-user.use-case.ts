import { Either, left, right } from '@/core/either';
import { Injectable } from '@nestjs/common';
import { User } from '../../enterprise/entities/user';
import { UsersRepository } from '../repositories/users.repository';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found.error';

interface UpdateUserUseCaseRequest {
  id: string;
  name: string;
  email: string;
}

type UpdateUserUseCaseResponse = Either<ResourceNotFoundError, { user: User }>;

@Injectable()
export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
    name,
    email,
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      return left(new ResourceNotFoundError());
    }

    user.name = name;
    user.email = email;

    await this.usersRepository.save(user);

    return right({
      user,
    });
  }
}
