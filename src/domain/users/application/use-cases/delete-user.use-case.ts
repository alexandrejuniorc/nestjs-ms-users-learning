import { Either, left, right } from '@/core/either';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found.error';

interface DeleteUserUseCaseRequest {
  id: string;
}

type DeleteUserUseCaseResponse = Either<ResourceNotFoundError, null>;

@Injectable()
export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
  }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      return left(new ResourceNotFoundError());
    }

    await this.usersRepository.delete(user);

    return right(null);
  }
}
