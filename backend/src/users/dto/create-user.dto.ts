import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Username cannot be empty.',
  })
  @IsString()
  @MinLength(3, { message: 'Username must be at least 3 characters long.' })
  @IsAlphanumeric('tr-TR', {
    message: 'Username can only consist of letters.',
  })
  username: string;

  @ApiProperty({
    nullable: false,
  })
  @IsNotEmpty({
    message: 'Password cannot be empty.',
  })
  @IsString()
  @MinLength(3, { message: 'Password must be at least 3 characters long.' })
  password: string;
}
