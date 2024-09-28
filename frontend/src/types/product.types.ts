export interface IProductsResponse {
  data: IProduct[];
  total: number;
  totalPages: number;
  page: number;
  pageSize: number;
}

export interface IProduct {
  code: string;
  createdDate: string;
  description: string;
  id: number;
  isActive: boolean;
  isDeleted: boolean;
  name: string;
  stockAvailable: boolean;
  stockCount: number;
  updatedDate: string;
}

export interface IProductsCountResponse {
  total: number;
}
