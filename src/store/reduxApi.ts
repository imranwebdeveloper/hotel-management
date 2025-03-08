import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse } from "@/types";
import { User, Property } from "@prisma/client";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api",
  prepareHeaders: (headers) => {
    return headers;
  },
});

const api = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Hotels"],
  endpoints: (builder) => ({
    registerUser: builder.mutation<ApiResponse<User>, Partial<User>>({
      query: (user) => ({
        url: "/auth/register",
        method: "POST",
        body: user,
      }),
    }),

    getHotels: builder.query<ApiResponse<Property[]>, { page: number }>({
      query: ({ page }) => ({
        url: `/hotels?page=${page}`,
      }),
      providesTags: ["Hotels"],
    }),

    getHotel: builder.query<ApiResponse<Property>, string | number>({
      query: (id) => ({
        url: `/hotels/${id}`,
      }),
      providesTags: ["Hotels"],
    }),

    createHotel: builder.mutation<ApiResponse<Property>, Partial<Property>>({
      query: (body) => ({
        url: `/hotels`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Hotels"],
    }),

    updateHotel: builder.mutation<
      ApiResponse<Property>,
      Partial<Property & { id: string }>
    >({
      query: ({ id, ...body }) => ({
        url: `/hotels/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Hotels"],
    }),

    deleteHotel: builder.mutation<ApiResponse<{ name: string }>, string>({
      query: (id) => ({
        url: `/hotels/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Hotels"],
    }),
  }),
});

export default api;
