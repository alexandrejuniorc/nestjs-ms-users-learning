import { CreateUserUseCase } from '@/domain/users/application/use-cases/create-user.use-case';
import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { z } from 'zod';

const createUserBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

type CreateUserBodySchema = z.infer<typeof createUserBodySchema>;

@Controller('/users')
export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post('create')
  async handle(@Body() data: CreateUserBodySchema) {
    const result = await this.createUserUseCase.execute(data);

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
