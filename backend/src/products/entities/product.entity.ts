import { BaseEntity } from 'src/lib/baseEntity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @Column({ type: 'varchar' })
  code: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'bool' })
  stockAvailable: boolean;

  @Column({ type: 'int' })
  stockCount: number;

  constructor(
    code?: string,
    name?: string,
    description?: string,
    stockCount?: number,
  ) {
    super();
    this.code = code;
    this.name = name;
    this.description = description;
    this.stockAvailable = stockCount > 0 ? true : false;
    this.stockCount = stockCount;
  }
}
