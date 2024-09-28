import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { productApi } from "../services/product";
import authSlice from "./slices/auth-slice";
import productSlice from "./slices/product-slice";

export const createStore = (
  options?: ConfigureStoreOptions["preloadedState"]
) =>
  configureStore({
    reducer: {
      [productApi.reducerPath]: productApi.reducer,
      auth: authSlice,
      product: productSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productApi.middleware),
    ...options,
  });

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
