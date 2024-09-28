import {
  IAuthRequest,
  ILoginResponse,
  IRegisterResponse,
} from "../types/auth.types";
import { api } from "./api";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, IAuthRequest>({
      query: (credentials) => ({
        url: "users/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<IRegisterResponse, IAuthRequest>({
      query: (credentials) => ({
        url: "users/create-user",
        method: "POST",
        body: credentials,
      }),
    }),
    protected: builder.mutation<IRegisterResponse, void>({
      query: () => ({
        url: "users/get-user",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useProtectedMutation } =
  authApi;
