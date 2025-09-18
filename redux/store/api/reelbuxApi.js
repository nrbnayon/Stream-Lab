// redux/store/api/reelbuxApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const reelbuxApi = createApi({
  reducerPath: "reelbuxApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/reelbux`,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = Cookies.get("accessToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["ReelBux"],
  endpoints: (builder) => ({
    getReelBuxBalance: builder.query({
      query: () => "/balance",
      providesTags: ["ReelBux"],
    }),
  }),
});

export const { useGetReelBuxBalanceQuery } = reelbuxApi;
