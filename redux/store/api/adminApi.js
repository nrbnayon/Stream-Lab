// redux/store/api/adminApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin`,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = Cookies.get("accessToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "AdminDashboard",
    "AdminUsers",
    "AdminFilms",
    "AdminPayments",
    "AdminDistro",
    "AdminSubscribers",
  ],
  endpoints: (builder) => ({
    // Dashboard
    getAdminDashboard: builder.query({
      query: () => "/dashboard",
      providesTags: ["AdminDashboard"],
    }),

    // User Management
    getAdminUsers: builder.query({
      query: ({ user_id, search } = {}) => {
        const params = new URLSearchParams();
        if (user_id) params.append("user_id", user_id);
        if (search) params.append("search", search);
        return `/manage-users${
          params.toString() ? `?${params.toString()}` : ""
        }`;
      },
      providesTags: ["AdminUsers"],
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/manage-users?user_id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminUsers"],
    }),

    // Films Management
    getAdminFilms: builder.query({
      query: ({ user_id, search } = {}) => {
        const params = new URLSearchParams();
        if (user_id) params.append("user_id", user_id);
        if (search) params.append("search", search);
        return `/films${params.toString() ? `?${params.toString()}` : ""}`;
      },
      providesTags: ["AdminFilms"],
    }),

    deleteFilm: builder.mutation({
      query: (filmId) => ({
        url: `/films-delete?film_id=${filmId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminFilms"],
    }),

    approveOrRejectFilm: builder.mutation({
      query: (data) => ({
        url: "/films-approve-reject",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AdminFilms"],
    }),

    // Payments Overview
    getAdminPayments: builder.query({
      query: ({ page = 1 } = {}) => `/payments-overview?page=${page}`,
      providesTags: ["AdminPayments"],
    }),

    // Distro Reports
    getAdminDistroReport: builder.query({
      query: () => "/distro-report",
      providesTags: ["AdminDistro"],
    }),

    // Subscribers Management
    getAdminSubscribers: builder.query({
      query: ({ search } = {}) => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        return `/subscribers${
          params.toString() ? `?${params.toString()}` : ""
        }`;
      },
      providesTags: ["AdminSubscribers"],
    }),

    deleteSubscriber: builder.mutation({
      query: (subscriberId) => ({
        url: `/subscribers?subscriber_id=${subscriberId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminSubscribers"],
    }),
  }),
});

export const {
  useGetAdminDashboardQuery,
  useGetAdminUsersQuery,
  useDeleteUserMutation,
  useGetAdminFilmsQuery,
  useDeleteFilmMutation,
  useApproveOrRejectFilmMutation,
  useGetAdminPaymentsQuery,
  useGetAdminDistroReportQuery,
  useGetAdminSubscribersQuery,
  useDeleteSubscriberMutation,
} = adminApi;
