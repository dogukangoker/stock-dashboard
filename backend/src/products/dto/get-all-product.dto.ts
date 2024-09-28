import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class PaginationDto {
  @ApiProperty({ description: 'Page number', example: 1 })
  @IsInt()
  @Min(1)
  page: number;

  @ApiProperty({ description: 'Number of items per page', example: 10 })
  @IsInt()
  @Min(1)
  pageSize: number;

  @IsOptional()
  @ApiPropertyOptional({ description: 'Product name', example: 'Camera' })
  @IsString()
  @MinLength(1)
  name?: string;
}
