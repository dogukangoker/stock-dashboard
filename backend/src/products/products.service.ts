import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductServiceErrorMessages } from 'src/lib/constants/errors';
import { FindManyOptions, ILike, In, Not, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductCountDto } from './dto/update-product-count.dto';
import { UpdateProductStatusDto } from './dto/update-product-status.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { code, name, description, stockCount } = createProductDto;

    const existProduct = await this.productRepository.findOneBy({ code });

    if (existProduct)
      throw new BadRequestException(ProductServiceErrorMessages.isExist);

    const product: Product = new Product(code, name, description, stockCount);

    const result = await this.productRepository.save(product);

    return result;
  }

  async getAllProducts(
    page: number,
    pageSize: number,
    name?: string,
  ): Promise<{ data: Product[]; total: number; totalPages: number }> {
    const where: FindManyOptions<Product>['where'] = {
      isActive: true,
      isDeleted: false,
    };

    if (name) {
      where.name = ILike(`%${name}%`);
    }

    const [result, total] = await this.productRepository.findAndCount({
      take: pageSize,
      skip: (page - 1) * pageSize,
      where,
      order: {
        id: 'ASC',
      },
    });

    const totalPages = Math.ceil(total / pageSize);

    return {
      data: result,
      total,
      totalPages,
    };
  }

  async getAllProductsCount(): Promise<{
    total: number;
  }> {
    const where: FindManyOptions<Product>['where'] = {
      isActive: true,
      isDeleted: false,
    };

    const [result, total] = await this.productRepository.findAndCount({
      where,
    });

    return {
      total,
    };
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({
      id,
      isActive: true,
      isDeleted: false,
    });

    if (!product)
      throw new BadRequestException(ProductServiceErrorMessages.notFound);

    return product;
  }

  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const { code, description, name, stockCount } = updateProductDto;
    const product = await this.productRepository.findOneBy({
      id,
      isActive: true,
      isDeleted: false,
    });

    if (!product)
      throw new BadRequestException(ProductServiceErrorMessages.notFound);

    const existingProduct = await this.productRepository.findOne({
      where: { code, id: Not(id) },
    });

    if (existingProduct) {
      throw new BadRequestException(ProductServiceErrorMessages.isExist);
    }

    const updatedProduct = new Product(code, name, description, stockCount);

    const productData = this.productRepository.merge(product, updatedProduct);

    const result = await this.productRepository.save(productData);

    return result;
  }

  async updateProductCount(
    updateProductCountDto: UpdateProductCountDto,
  ): Promise<Product[]> {
    // Ensure return type is an array of Product
    // Extract the product IDs from the DTO
    const productIds = updateProductCountDto.products.map((p) => p.id);

    // Fetch all products matching the IDs and that are active and not deleted
    const products = await this.productRepository.find({
      where: {
        id: In(productIds),
        isActive: true,
        isDeleted: false,
      },
    });

    if (!products || products.length === 0) {
      throw new BadRequestException(ProductServiceErrorMessages.notFound);
    }

    // Map through the products, update their stockCount, and prepare for saving
    const updatedProducts = products.map((product) => {
      const productToUpdate = updateProductCountDto.products.find(
        (p) => p.id === product.id,
      );

      if (productToUpdate) {
        product.stockCount = productToUpdate.count; // Update the stock count
      }

      return product; // Return the updated product
    });

    // Save all updated products to the database
    const result = await this.productRepository.save(updatedProducts);

    return result; // Return the array of updated products
  }

  async updateProductStatus(
    updateProductStatusDto: UpdateProductStatusDto,
  ): Promise<Product> {
    const { id, isActive } = updateProductStatusDto;
    const product = await this.productRepository.findOneBy({ id });

    if (!product)
      throw new BadRequestException(ProductServiceErrorMessages.notFound);

    const updatedProduct = new Product();
    updatedProduct.isActive = isActive;
    updatedProduct.isDeleted = !isActive;

    const productData = this.productRepository.merge(product, updatedProduct);

    const result = await this.productRepository.save(productData);

    return result;
  }
}
