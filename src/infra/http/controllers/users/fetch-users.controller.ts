import { FetchUsersUseCase } from '@/domain/users/application/use-cases/fetch-users.use-case';
import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { HTTPUserPresenter } from '../../presenters/http-user.presenter';

@Controller('/users')
export class FetchUsersController {
  constructor(private fetchUsersUseCase: FetchUsersUseCase) {}

  @Get()
  async handle(@Query('page') page: number) {
    const result = await this.fetchUsersUseCase.execute({ page });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const { users } = result.value;

    return {
      users: users.map((user) => HTTPUserPresenter.toHTTP(user)),
    };
  }
}
