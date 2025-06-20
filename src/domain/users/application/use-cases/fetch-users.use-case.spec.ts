import { InMemoryUsersRepository } from 'test/repositories/in-memory-users.repository';
import { FetchUsersUseCase } from './fetch-users.use-case';
import { makeUser } from 'test/factories/make-user.factory';

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: FetchUsersUseCase;

describe('Fetch Users Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();

    sut = new FetchUsersUseCase(inMemoryUsersRepository);
  });

  it('should be able to fetch users', async () => {
    await inMemoryUsersRepository.create(
      makeUser({
        name: 'John Doe',
        email: 'johndoe@mail.com',
      }),
    );
    await inMemoryUsersRepository.create(
      makeUser({
        name: 'John Doe 1',
        email: 'johndoe1@mail.com',
      }),
    );
    await inMemoryUsersRepository.create(
      makeUser({
        name: 'John Doe 2',
        email: 'johndoe2@mail.com',
      }),
    );

    const result = await sut.execute({ page: 1 });

    expect(result.isRight()).toBe(true);
    expect(result.value?.users).toHaveLength(3);
  });

  it('should be able to fetch paginated users', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryUsersRepository.create(
        makeUser({
          name: `John Doe ${i}`,
          email: `johndoe${i}@mail.com`,
        }),
      );
    }

    const result = await sut.execute({ page: 2 });

    expect(result.isRight()).toBe(true);
    expect(result.value?.users).toHaveLength(2);
  });
});
