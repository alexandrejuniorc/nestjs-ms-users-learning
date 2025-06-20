import { InMemoryUsersRepository } from 'test/repositories/in-memory-users.repository';
import { UpdateUserUseCase } from './update-user.use-case';
import { makeUser } from 'test/factories/make-user.factory';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found.error';

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: UpdateUserUseCase;

describe('Update User Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();

    sut = new UpdateUserUseCase(inMemoryUsersRepository);
  });

  it('should be able to update a user', async () => {
    const user = makeUser({
      name: 'John Doe',
      email: 'johndoe@mail.com',
    });

    await inMemoryUsersRepository.create(user);

    const result = await sut.execute({
      id: user.id.toString(),
      name: 'John Doe 1 Updated',
      email: 'johndoe1updated@mail.com',
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryUsersRepository.items[0]).toMatchObject({
      name: 'John Doe 1 Updated',
      email: 'johndoe1updated@mail.com',
    });
  });

  it('should not be able to update a non-existing user', async () => {
    const user = makeUser({
      name: 'John Doe',
      email: 'johndoe@mail.com',
    });

    await inMemoryUsersRepository.create(user);

    const result = await sut.execute({
      id: 'user-not-found',
      name: 'John Doe 1 Updated',
      email: 'johndoe1updated@mail.com',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
