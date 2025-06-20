import { InMemoryUsersRepository } from 'test/repositories/in-memory-users.repository';
import { DeleteUserUseCase } from './delete-user.use-case';
import { makeUser } from 'test/factories/make-user.factory';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found.error';

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: DeleteUserUseCase;

describe('Delete User Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();

    sut = new DeleteUserUseCase(inMemoryUsersRepository);
  });

  it('should be able to delete a user', async () => {
    const user = makeUser({
      name: 'John Doe',
      email: 'johndoe@mail.com',
    });

    await inMemoryUsersRepository.create(user);

    const result = await sut.execute({ id: user.id.toString() });

    expect(result.isRight()).toBe(true);
    expect(inMemoryUsersRepository.items).toHaveLength(0);
  });

  it('should not be able to delete a non-existing user', async () => {
    const user = makeUser({
      name: 'John Doe',
      email: '',
    });

    await inMemoryUsersRepository.create(user);

    const result = await sut.execute({ id: 'user-not-found' });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
