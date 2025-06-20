import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '@/infra/app.module';
import request from 'supertest';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

describe('Create User [E2E]', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get<PrismaService>(PrismaService);

    await app.init();
  });

  test('[POST] /users', async () => {
    const response = await request(app.getHttpServer()).post('/users').send({
      name: 'John Doe',
      email: 'johndoeprisma@mail.com',
    });

    expect(response.status).toBe(201);

    const userOnDatabase = await prisma.user.findUnique({
      where: { email: 'johndoeprisma@mail.com' },
    });

    expect(userOnDatabase).toBeTruthy();
  });
});
