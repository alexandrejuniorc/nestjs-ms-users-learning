import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { User } from '@/domain/users/enterprise/entities/user';
import { User as PrismaUser, type Prisma } from '@prisma/client';

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        name: raw.name,
        email: raw.email,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
    };
  }
}
