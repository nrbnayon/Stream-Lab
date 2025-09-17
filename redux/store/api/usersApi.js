// src/store/api/usersApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/settings`,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = Cookies.get("accessToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Terms", "AdminTerms"],
  endpoints: (builder) => ({
    // User and Admin: Get user profile
    getMe: builder.query({
      query: () => "/personal-information/me",
      providesTags: ["User"],
    }),

    // User and Admin: Update user profile (PUT method)
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/personal-information/me",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // User and Admin: Update user profile with multipart form-data (PATCH method)
    updateProfileImage: builder.mutation({
      query: (formData) => ({
        url: "/personal-information/me",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),

    // User and Admin: Change password
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/change-password",
        method: "POST",
        body: data,
      }),
    }),

    // User and Admin: Get user terms
    getUserTerms: builder.query({
      query: () => "/user-terms",
      providesTags: ["Terms"],
    }),

    // Admin only: Get admin terms
    getAdminTerms: builder.query({
      query: () => "/admin-terms",
      providesTags: ["AdminTerms"],
    }),

    // Admin only: Create admin terms
    createAdminTerms: builder.mutation({
      query: (data) => ({
        url: "/admin-terms",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AdminTerms"],
    }),

    // Admin only: Update admin terms
    updateAdminTerms: builder.mutation({
      query: ({ terms_id, ...data }) => ({
        url: "/admin-terms",
        method: "PATCH",
        body: { terms_id, ...data },
      }),
      invalidatesTags: ["AdminTerms"],
    }),

    // Admin only: Delete admin terms
    deleteAdminTerms: builder.mutation({
      query: (terms_id) => ({
        url: "/admin-terms",
        method: "DELETE",
        body: { terms_id },
      }),
      invalidatesTags: ["AdminTerms"],
    }),
  }),
});

export const {
  useGetMeQuery,
  useUpdateProfileMutation,
  useUpdateProfileImageMutation,
  useChangePasswordMutation,
  useGetUserTermsQuery,
  useGetAdminTermsQuery,
  useCreateAdminTermsMutation,
  useUpdateAdminTermsMutation,
  useDeleteAdminTermsMutation,
} = usersApi;
