import { User } from '@/domain/users/enterprise/entities/user';

export class HTTPUserPresenter {
  static toHTTP(user: User) {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
    };
  }
}
