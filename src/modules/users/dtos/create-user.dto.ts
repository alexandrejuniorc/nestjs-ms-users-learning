import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'user email',
    example: 'email@email.com',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'username',
    example: 'josé',
  })
  @IsEmail()
  email: string;
}
