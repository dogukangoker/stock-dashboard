import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseIntPipe,
  Put,
  UseGuards,
  ParseArrayPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateProductStatusDto } from './dto/update-product-status.dto';
import { UpdateProductCountDto } from './dto/update-product-count.dto';
import { AuthGuard } from 'src/users/auth.guard';

@Controller('products')
@ApiTags('Products')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Get('get-all-products')
  @ApiQuery({ name: 'page', required: true, type: Number })
  @ApiQuery({ name: 'pageSize', required: true, type: Number })
  @ApiQuery({ name: 'name', required: false, type: String })
  async findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
    @Query('name') name?: string,
  ) {
    const products = await this.productsService.getAllProducts(
      page,
      pageSize,
      name,
    );
    return {
      data: products.data,
      total: products.total,
      totalPages: products.totalPages,
      page: page,
      pageSize: pageSize,
    };
  }

  @Get('get-all-products-count')
  async findAllProductsCount() {
    const products = await this.productsService.getAllProductsCount();

    return {
      total: products.total,
    };
  }

  @Get('get-product-by-id/:id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Put('update-product/:id')
  updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(+id, updateProductDto);
  }

  @Put('update-product-count')
  updateProductCount(@Body() updateProductCountDto: UpdateProductCountDto) {
    return this.productsService.updateProductCount(updateProductCountDto);
  }

  @Put('update-product-status/:id')
  @ApiOkResponse()
  updateProductStatus(@Body() updateProductStatusDto: UpdateProductStatusDto) {
    return this.productsService.updateProductStatus(updateProductStatusDto);
  }
}
