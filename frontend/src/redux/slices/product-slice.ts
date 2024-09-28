import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { productApi } from "../../services/product";
import { IProduct } from "../../types/product.types";
import { RootState } from "../store";

type ProductState = {
  products: IProduct[];
  selectedProducts: IProduct[] | null;
  total: number;
  totalPages: number;
  productsQuery: {
    page: number;
    pageSize: number;
    name?: string;
  };
  error: string | null;
  status: "success" | "error" | null;
  showMaterialUseModal: boolean;
};

const initialState = {
  products: [],
  selectedProducts: null,
  total: 0,
  totalPages: 0,
  productsQuery: {
    page: 1,
    pageSize: 10,
  },
  error: null,
  status: null,
  showMaterialUseModal: false,
} as ProductState;

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    setProductsQuery: (
      state,
      action: PayloadAction<{ page: number; pageSize: number; name?: string }>
    ) => {
      state.productsQuery = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setStatus: (state, action: PayloadAction<"success" | "error" | null>) => {
      state.status = action.payload;
    },
    setSelectedProducts: (state, action) => {
      state.selectedProducts = action.payload;
    },
    setShowMaterialUseModal: (state, action) => {
      state.showMaterialUseModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      productApi.endpoints.getAllProducts.matchFulfilled,
      (state, { payload }) => {
        state.products = payload.data;
        state.total = payload.total;
        state.totalPages = payload.totalPages;
      }
    );
  },
});

export const {
  setProducts,
  setProductsQuery,
  setError,
  setStatus,
  setTotal,
  setTotalPages,
  setSelectedProducts,
  setShowMaterialUseModal,
} = productSlice.actions;
export default productSlice.reducer;

export const selectProducts = (state: RootState) =>
  state.product.selectedProducts;
export const selectAllProducts = (state: RootState) => state.product.products;
export const selectProductsQuery = (state: RootState) =>
  state.product.productsQuery;
export const selectError = (state: RootState) => state.product.error;
export const selectStatus = (state: RootState) => state.product.status;
export const selectTotal = (state: RootState) => state.product.total;
export const selectTotalPages = (state: RootState) => state.product.totalPages;
export const selectMaterialUseModal = (state: RootState) =>
  state.product.showMaterialUseModal;
