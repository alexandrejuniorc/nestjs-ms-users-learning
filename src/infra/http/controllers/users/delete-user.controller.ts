import { DeleteUserUseCase } from '@/domain/users/application/use-cases/delete-user.use-case';
import { BadRequestException, Controller, Param, Post } from '@nestjs/common';

@Controller('/users')
export class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}

  @Post(':id')
  async handle(@Param('id') id: string) {
    const result = await this.deleteUserUseCase.execute({ id });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
