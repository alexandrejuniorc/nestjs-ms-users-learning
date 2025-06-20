import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { User, UserProps } from '@/domain/users/enterprise/entities/user';
import { PrismaUserMapper } from '@/infra/database/prisma/mappers/prisma-user.mapper';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

export function makeUser(
  override: Partial<UserProps>,
  id?: UniqueEntityID,
): User {
  const user = User.create(
    {
      name: override.name!,
      email: override.email!,
      ...override,
    },
    id,
  );

  return user;
}

@Injectable()
export class UserFactory {
  constructor(private readonly prismaService: PrismaService) {}

  async makePrismaUser(data: Partial<UserProps>): Promise<User> {
    const user = makeUser(data);

    await this.prismaService.user.create({
      data: PrismaUserMapper.toPrisma(user),
    });

    return user;
  }
}
