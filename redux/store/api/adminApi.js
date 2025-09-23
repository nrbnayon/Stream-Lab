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
      query: ({ user_id, search, page = 1 } = {}) => {
        const params = new URLSearchParams();
        if (user_id) params.append("user_id", user_id);
        if (search) params.append("search", search);
        if (page) params.append("page", page);
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
      invalidatesTags: ["AdminUsers", "AdminPayments"],
    }),

    // Films Management
    getAdminFilms: builder.query({
      query: ({ user_id, search, page = 1 } = {}) => {
        const params = new URLSearchParams();
        if (user_id) params.append("user_id", user_id);
        if (search) params.append("search", search);
        if (page) params.append("page", page);
        return `/films${params.toString() ? `?${params.toString()}` : ""}`;
      },
      providesTags: ["AdminFilms"],
    }),

    deleteFilm: builder.mutation({
      query: (filmId) => ({
        url: `/films-delete?film_id=${filmId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminFilms", "AdminPayments"],
    }),

    approveOrRejectFilm: builder.mutation({
      query: (data) => ({
        url: "/films-approve-reject",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AdminFilms"],
    }),

    // Payments Overview - Enhanced with better caching
    getAdminPayments: builder.query({
      query: ({ page = 1 } = {}) => `/payments-overview?page=${page}`,
      providesTags: (result, error, arg) => [
        { type: "AdminPayments", id: `page-${arg?.page || 1}` },
        "AdminPayments",
      ],
      // Keep cache for 5 minutes
      keepUnusedDataFor: 300,
    }),

    // Distro Reports
    getAdminDistroReport: builder.query({
      query: ({ page = 1 } = {}) => {
        const params = new URLSearchParams();
        if (page) params.append("page", page);
        return `/distro-report${
          params.toString() ? `?${params.toString()}` : ""
        }`;
      },
      providesTags: (result, error, arg) => [
        { type: "AdminDistro", id: `page-${arg?.page || 1}` },
        "AdminDistro",
      ],
      keepUnusedDataFor: 300,
    }),

    // Subscribers Management
    getAdminSubscribers: builder.query({
      query: ({ search, page = 1 } = {}) => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (page) params.append("page", page);
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
