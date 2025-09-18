// redux/store/api/filmsApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const filmsApi = createApi({
  reducerPath: "filmsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/flims`,
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
    "Films",
    "MyLibrary",
    "MyTitles",
    "FilmDetails",
    "Drama",
    "Drama Movies",
    "Action Movies",
    "Comedy Movies",
    "Horror Movies",
    "Romance Movies",
    "Sci-Fi Movies",
    "Thriller Movies",
    "War Movies",
    "Western Movies",
  ],
  endpoints: (builder) => ({
    // Public endpoints
    getTrendingFilms: builder.query({
      query: () => "/trending",
      providesTags: ["Films"],
    }),

    getLatestFilms: builder.query({
      query: () => "/latest",
      providesTags: ["Films", "Drama", "Drama Movies"],
    }),

    searchFilms: builder.query({
      query: (searchTerm) => `/search?search=${encodeURIComponent(searchTerm)}`,
      providesTags: ["Films"],
    }),

    getGenres: builder.query({
      query: () => "/genre",
      providesTags: ["Films"],
    }),

    // Protected endpoints
    getMyLibrary: builder.query({
      query: ({ access_type, search } = {}) => {
        const params = new URLSearchParams();
        if (access_type) params.append("access_type", access_type);
        if (search) params.append("search", search);
        return `/my-library${params.toString() ? `?${params.toString()}` : ""}`;
      },
      providesTags: ["MyLibrary"],
    }),

    getMyTitles: builder.query({
      query: ({ status, search } = {}) => {
        const params = new URLSearchParams();
        if (status) params.append("status", status);
        if (search) params.append("search", search);
        return `/my-titles${params.toString() ? `?${params.toString()}` : ""}`;
      },
      providesTags: ["MyTitles"],
    }),

    getMyTitlesAnalytics: builder.query({
      query: (filmId) => ({
        url: "/my-titles/analytics",
        method: "GET",
        body: { film_id: filmId },
      }),
      providesTags: ["MyTitles"],
    }),

    getFilmDetails: builder.query({
      query: (filmId) => ({
        url: "/details",
        method: "GET",
        body: { film_id: filmId },
      }),
      providesTags: ["FilmDetails"],
    }),

    getSingleMyTitle: builder.query({
      query: (filmId) => `/my-titles/single?film_id=${filmId}`,
      providesTags: ["MyTitles"],
    }),

    // Film upload
    uploadFilm: builder.mutation({
      query: (formData) => ({
        url: "/upload",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["MyTitles"],
    }),

    // Edit film
    editFilm: builder.mutation({
      query: (formData) => ({
        url: "/my-titles/edit",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["MyTitles", "FilmDetails"],
    }),

    // Views and watch time tracking
    incrementViewCount: builder.mutation({
      query: (filmId) => ({
        url: "/views-count",
        method: "POST",
        body: { film_id: filmId },
      }),
    }),

    updateWatchTime: builder.mutation({
      query: ({ filmId, watchTime }) => ({
        url: "/watch-time-count",
        method: "POST",
        body: { film_id: filmId, watch_time: watchTime },
      }),
    }),
  }),
});

export const {
  useGetTrendingFilmsQuery,
  useGetLatestFilmsQuery,
  useSearchFilmsQuery,
  useGetGenresQuery,
  useGetMyLibraryQuery,
  useGetMyTitlesQuery,
  useGetMyTitlesAnalyticsQuery,
  useGetFilmDetailsQuery,
  useGetSingleMyTitleQuery,
  useUploadFilmMutation,
  useEditFilmMutation,
  useIncrementViewCountMutation,
  useUpdateWatchTimeMutation,
} = filmsApi;
