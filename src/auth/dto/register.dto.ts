import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'johndoe',
  })
  username!: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'johndoe@example.com',
  })
  email!: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password',
  })
  password!: string;
}
