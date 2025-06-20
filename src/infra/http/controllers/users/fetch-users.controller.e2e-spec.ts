import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '@/infra/app.module';
import request from 'supertest';
import { UserFactory } from 'test/factories/make-user.factory';
import { DatabaseModule } from '@/infra/database/database.module';

describe('Fetch Users [E2E]', () => {
  let app: INestApplication;
  let userFactory: UserFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    userFactory = moduleRef.get<UserFactory>(UserFactory);

    await app.init();
  });

  test('[GET] /users', async () => {
    for (let i = 0; i < 5; i++) {
      await userFactory.makePrismaUser({
        name: `John Doe ${i + 1}`,
        email: `johndoeprisma${i + 1}@mail.com`,
      });
    }

    const response = await request(app.getHttpServer()).get('/users?page=1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      users: expect.arrayContaining([
        expect.objectContaining({ name: 'John Doe 1' }),
        expect.objectContaining({ name: 'John Doe 2' }),
        expect.objectContaining({ name: 'John Doe 3' }),
        expect.objectContaining({ name: 'John Doe 4' }),
        expect.objectContaining({ name: 'John Doe 5' }),
      ]),
    });
  });
});
