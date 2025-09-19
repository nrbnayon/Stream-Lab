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
      query: (params = {}) => {
        const searchParams = new URLSearchParams();

        if (params.access_type) {
          searchParams.append("access_type", params.access_type);
        }
        if (params.search) {
          searchParams.append("search", params.search);
        }
        if (params.page) {
          searchParams.append("page", params.page);
        }
        if (params.page_size) {
          searchParams.append("page_size", params.page_size);
        }

        const queryString = searchParams.toString();
        return `/my-library${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: (result, error, params) => [
        { type: "MyLibrary", id: `page-${params?.page || 1}` },
        "MyLibrary",
      ],
      // Keep cache for different pages/filters
      serializeQueryArgs: ({ queryArgs }) => {
        const { page, ...otherParams } = queryArgs || {};
        return { page, ...otherParams };
      },
    }),

    getMyLibraryDetails: builder.query({
      query: (filmId) => `/my-library-details?film_id=${filmId}`,
      providesTags: ["MyLibrary"],
    }),

    getMyTitles: builder.query({
      query: ({ status, search, page, page_size } = {}) => {
        const params = new URLSearchParams();
        if (status) params.append("status", status);
        if (search) params.append("search", search);
        if (page) params.append("page", page);
        if (page_size) params.append("page_size", page_size);
        return `/my-titles${params.toString() ? `?${params.toString()}` : ""}`;
      },
      providesTags: (result, error, params) => [
        { type: "MyTitles", id: `page-${params?.page || 1}` },
        "MyTitles",
      ],
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
      // Invalidate library cache to update progress
      invalidatesTags: ["MyLibrary"],
    }),
  }),
});

export const {
  useGetTrendingFilmsQuery,
  useGetLatestFilmsQuery,
  useSearchFilmsQuery,
  useGetGenresQuery,
  useGetMyLibraryQuery,
  useGetMyLibraryDetailsQuery,
  useGetMyTitlesQuery,
  useGetMyTitlesAnalyticsQuery,
  useGetFilmDetailsQuery,
  useGetSingleMyTitleQuery,
  useUploadFilmMutation,
  useEditFilmMutation,
  useIncrementViewCountMutation,
  useUpdateWatchTimeMutation,
} = filmsApi;
