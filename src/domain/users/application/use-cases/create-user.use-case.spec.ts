import { InMemoryUsersRepository } from 'test/repositories/in-memory-users.repository';
import { CreateUserUseCase } from './create-user.use-case';

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: CreateUserUseCase;

describe('Create User Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();

    sut = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it('should be able to create a user', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com',
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryUsersRepository.items[0]).toEqual(result.value?.user);
  });
});
