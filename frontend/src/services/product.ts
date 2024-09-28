import {
  IProduct,
  IProductsCountResponse,
  IProductsResponse,
} from "../types/product.types";
import { api } from "./api";

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllProducts: build.query<
      IProductsResponse,
      { page: number; pageSize: number; name?: string }
    >({
      query: ({ page, pageSize, name }) => ({
        url: `/products/get-all-products`,
        params: { page, pageSize, name },
      }),
      providesTags: ["Products"],
    }),
    getAllProductsCount: build.query<IProductsCountResponse, void>({
      query: () => "/products/get-all-products-count",
      providesTags: ["Products"],
    }),
    addProduct: build.mutation<IProduct, Partial<IProduct>>({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: build.mutation<IProduct, Partial<IProduct>>({
      query: (updatedProduct) => ({
        url: `/products/update-product/${updatedProduct.id}`,
        method: "PUT",
        body: updatedProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProductStatus: build.mutation<
      void,
      { id: number; isActive: boolean }
    >({
      query: ({ id, isActive }) => ({
        url: `/products/update-product-status/${id}`,
        method: "PUT",
        body: { id, isActive },
      }),
      invalidatesTags: ["Products"],
    }),
    updateProductsCounts: build.mutation<void, {}>({
      query: (credentials) => ({
        url: "/products/update-product-count",
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetAllProductsCountQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useUpdateProductStatusMutation,
  useUpdateProductsCountsMutation,
} = productApi;
