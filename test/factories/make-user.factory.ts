import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { User, UserProps } from '@/domain/users/enterprise/entities/user';

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
