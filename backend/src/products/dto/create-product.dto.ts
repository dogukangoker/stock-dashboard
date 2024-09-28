import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString({
    message: 'DEVERR: code property must be string type.',
  })
  @IsNotEmpty({
    message: 'Product code cannot be empty.',
  })
  code: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  @IsNotEmpty({
    message: 'Product name cannot be empty.',
  })
  @MinLength(3, {
    message: 'Product name must be at least 3 characters long.',
  })
  @MaxLength(255, {
    message: 'Product name can be up to 255 characters long.',
  })
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({
    message: 'Product description cannot be empty.',
  })
  @MinLength(3, {
    message: 'Product description must be at least 3 characters long.',
  })
  @MaxLength(255, {
    message: 'Product description can be up to 255 characters long.',
  })
  description: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  stockCount: number;
}
