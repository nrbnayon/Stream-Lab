// redux/store/api/distroApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const distroApi = createApi({
  reducerPath: "distroApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/distro`,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = Cookies.get("accessToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Distro"],
  endpoints: (builder) => ({
    getDistroBalance: builder.query({
      query: () => "/balance",
      providesTags: ["Distro"],
    }),
  }),
});

export const { useGetDistroBalanceQuery } = distroApi;
