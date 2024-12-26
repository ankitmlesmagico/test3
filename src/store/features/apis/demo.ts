// src/features/dummy/dummyApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'dummyApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }), // URL of your dummy server
  tagTypes: ['Items'],
  endpoints: (builder) => ({
    getItems: builder.query({
      query: () => 'items',
      providesTags: ['Items'],
    }),
    getItemById: builder.query({
      query: (id) => `items/${id}`,
      providesTags: ['Items'],
    }),
    addItem: builder.mutation({
      query: (newItem) => ({
        url: 'items',
        method: 'POST',
        body: newItem,
      }),
      invalidatesTags: ['Items'],
    }),
    updateItem: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `items/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ['Items'],
    }),
    deleteItem: builder.mutation({
      query: (id) => ({
        url: `items/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Items'],
    }),
  }),
});

export const {
  useGetItemsQuery,
  useGetItemByIdQuery,
  useAddItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = apiSlice;

// there are 5 types of query are
//lazy query
//mutaion
//query
//use injectend point if you want to push further api calls
//refetch onFoucs
//refetch onRecconect this are also provided here // also need to setup listner
//learn optimistic approach also
