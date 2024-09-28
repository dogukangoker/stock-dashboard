import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min, ValidateNested } from 'class-validator';

export class UpdateProductCountDto {
  @ApiProperty({
    type: () => [ProductCount],
    example: [
      { id: 1, count: 10 },
      { id: 2, count: 5 },
    ],
    description: 'An array of products with their updated stock counts',
  })
  @ValidateNested({ each: true })
  @Type(() => ProductCount)
  products: ProductCount[];
}

class ProductCount {
  @ApiProperty({
    example: 1,
    description: 'The ID of the product',
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    example: 10,
    description: 'The updated stock count for the product',
    minimum: 0,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  count: number;
}
