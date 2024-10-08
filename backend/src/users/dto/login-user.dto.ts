import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
