import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiClient } from '../../services/apiClient';
import customBaseQuery from '../../services/apiClient';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (userData) => ({
        url: '/signup',
        method: 'POST',
        body: userData,
      }),
    }),
    getUsers: builder.query({
      query: ({ page = 1, limit = 10 }) => `/users?page=${page}&limit=${limit}`,
    }),
    getProfile: builder.query({
      query: () => '/me',
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useGetUsersQuery, useGetProfileQuery } = authApi;