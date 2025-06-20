import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '@/infra/app.module';
import request from 'supertest';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { UserFactory } from 'test/factories/make-user.factory';
import { DatabaseModule } from '@/infra/database/database.module';

describe('Delete User [E2E]', () => {
  let app: INestApplication;
  let userFactory: UserFactory;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    userFactory = moduleRef.get<UserFactory>(UserFactory);
    prisma = moduleRef.get<PrismaService>(PrismaService);

    await app.init();
  });

  test('[DELETE] /users/:id', async () => {
    const user = await userFactory.makePrismaUser({
      name: 'John Doe',
      email: 'johndoeprisma@mail.com',
    });

    const response = await request(app.getHttpServer()).delete(
      `/users/${user.id}`,
    );

    expect(response.status).toBe(200);

    const userOnDatabase = await prisma.user.findUnique({
      where: { email: 'johndoeprisma@mail.com' },
    });

    expect(userOnDatabase).toBeNull();
  });
});
