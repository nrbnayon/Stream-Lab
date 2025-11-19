// redux/store/api/filmsApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const filmsApi = createApi({
  reducerPath: "filmsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/flims`,
    credentials: "include",
    prepareHeaders: (headers, { endpoint }) => {
      const token = Cookies.get("accessToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      // Don't set Content-Type for FormData - let browser set it with boundary
      if (endpoint === "editFilm" || endpoint === "uploadFilm") {
        // Remove any existing content-type to let browser handle FormData
        headers.delete("content-type");
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
      query: (filmId) => ({
        url: `/my-library-details?film_id=${filmId}`,
        method: "GET",
      }),
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
        method: "post",
        body: { film_id: filmId },
      }),
      providesTags: ["MyTitles"],
    }),

    getFilmDetails: builder.query({
      query: (filmId) => ({
        url: `/details?film_id=${filmId}`,
        method: "get",
      }),
      providesTags: ["FilmDetails"],
    }),

    getMyTitleFilmDetails: builder.query({
      query: (filmId) => ({
        url: `/my-titles/edit?film_id=${filmId}`,
        method: "get",
      }),
      providesTags: ["FilmDetails"],
    }),

    // Film upload
    uploadFilm: builder.mutation({
      query: (formData) => {
        // Debug log to verify FormData contents
        console.log("Upload FormData entries:");
        for (let [key, value] of formData.entries()) {
          console.log(key, value);
          if (value instanceof File) {
            console.log(
              `File: ${value.name}, Size: ${value.size}, Type: ${value.type}`
            );
          }
        }

        return {
          url: "/upload",
          method: "POST",
          body: formData,
          // Don't set headers - let RTK Query handle FormData
        };
      },
      invalidatesTags: ["MyTitles", "Films"],
      // Handle upload progress if needed
      onQueryStarted: async (formData, { queryFulfilled, dispatch }) => {
        try {
          const result = await queryFulfilled;
          console.log("Upload successful:", result);
        } catch (error) {
          console.error("Upload failed:", error);
        }
      },
    }),

    // Edit film - Fixed to properly handle FormData
    editFilm: builder.mutation({
      query: (formData) => {
        // Debug log to verify FormData contents
        console.log("FormData entries:");
        for (let [key, value] of formData.entries()) {
          console.log(key, value);
          if (value instanceof File) {
            console.log(
              `File: ${value.name}, Size: ${value.size}, Type: ${value.type}`
            );
          }
        }

        return {
          url: "/my-titles/edit",
          method: "PUT",
          body: formData,
          // Don't manually set Content-Type - let browser handle FormData with boundary
        };
      },
      invalidatesTags: ["MyTitles", "FilmDetails", "MyLibrary"],
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
  useGetMyTitleFilmDetailsQuery,
  useUploadFilmMutation,
  useEditFilmMutation,
  useIncrementViewCountMutation,
  useUpdateWatchTimeMutation,
} = filmsApi;
