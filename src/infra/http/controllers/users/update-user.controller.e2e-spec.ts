import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '@/infra/app.module';
import request from 'supertest';
import { UserFactory } from 'test/factories/make-user.factory';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

describe('Update User [E2E]', () => {
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

  test('[PATCH] /users/:id', async () => {
    const user = await userFactory.makePrismaUser({
      name: 'John Doe Prisma',
      email: 'johndoeprisma@mail.com',
    });

    const response = await request(app.getHttpServer())
      .patch(`/users/${user.id}`)
      .send({
        name: 'John Doe Updated',
        email: 'johndoeupdated@mail.com',
      });

    expect(response.status).toBe(200);

    const userOnDatabase = await prisma.user.findUnique({
      where: { id: user.id.toString() },
    });

    expect(userOnDatabase).toBeTruthy();
  });
});
