// src/store/api/usersApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/user`,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = Cookies.get("accessToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Users"],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (params) => ({
        url: "/all",
        params,
      }),
      providesTags: ["Users"],
    }),

    getUserById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),

    getMe: builder.query({
      query: () => "/me",
      providesTags: ["User"],
    }),

    createUser: builder.mutation({
      query: (data) => ({
        url: "/sign-up",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/profile-update",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User", "Users"],
    }),

    updateProfileImage: builder.mutation({
      query: (formData) => ({
        url: "/profile-image",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["User", "Users"],
    }),

    adminUpdateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User", "Users"],
    }),

    changeUserStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["User", "Users"],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),

    searchUsers: builder.query({
      query: (searchTerm) => ({
        url: "/search",
        params: { searchTerm },
      }),
    }),

    registerDeviceToken: builder.mutation({
      query: (data) => ({
        url: "/register-device-token",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useGetMeQuery,
  useCreateUserMutation,
  useUpdateProfileMutation,
  useUpdateProfileImageMutation,
  useAdminUpdateUserMutation,
  useChangeUserStatusMutation,
  useDeleteUserMutation,
  useSearchUsersQuery,
  useRegisterDeviceTokenMutation,
} = usersApi;