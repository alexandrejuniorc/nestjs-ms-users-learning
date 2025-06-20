import { UpdateUserUseCase } from '@/domain/users/application/use-cases/update-user.use-case';
import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Patch,
} from '@nestjs/common';
import { z } from 'zod';

const updateUserBodySchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
});

type UpdateUserBodySchema = z.infer<typeof updateUserBodySchema>;

@Controller('/users')
export class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() data: UpdateUserBodySchema) {
    const result = await this.updateUserUseCase.execute({
      id,
      name: data.name,
      email: data.email,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
