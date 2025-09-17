// redux/store/api/authApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth`,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = Cookies.get("accessToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/sign-in",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          // Handle the actual API response structure
          if (data && data.access_token) {
            // Store tokens in cookies
            Cookies.set("accessToken", data.access_token, { expires: 365 });
            Cookies.set("refreshToken", data.refresh_token, { expires: 365 });
            Cookies.set("userRole", data.role, { expires: 365 });
            Cookies.set("userId", data.user_id, { expires: 365 });

            // Dispatch setCredentials with the correct data structure
            const { setCredentials } = await import("../slices/authSlice");
            dispatch(setCredentials(data));
          }
        } catch (error) {
          console.error("Login error:", error);
        }
      },
    }),

    signup: builder.mutation({
      query: (userData) => ({
        url: "/sign-up",
        method: "POST",
        body: userData,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    verifyEmail: builder.mutation({
      query: (data) => ({
        url: "/verify-reset-code",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/reset-password",
        method: "POST",
        body: data,
      }),
      transformResponse: (response, meta) => {
        if (
          (response === null || response === undefined) &&
          meta?.response?.status === 200
        ) {
          return {
            status: "success",
            message: "Password updated successfully!",
          };
        }
        // Return the response as is if it exists
        return (
          response || {
            status: "success",
            message: "Password updated successfully!",
          }
        );
      },
    }),

    refreshToken: builder.mutation({
      query: (data) => ({
        url: "/refresh-token",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          if (data && data.access_token) {
            // Update tokens
            Cookies.set("accessToken", data.access_token, { expires: 365 });
            if (data.refresh_token) {
              Cookies.set("refreshToken", data.refresh_token, { expires: 365 });
            }

            // Update auth state if needed
            const { setCredentials } = await import("../slices/authSlice");
            dispatch(setCredentials(data));
          }
        } catch (error) {
          console.error("Token refresh error:", error);
        }
      },
    }),

    resendOtp: builder.mutation({
      query: (data) => ({
        url: "/resend-otp",
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch }) {
        // Clear local storage immediately
        const { logout } = await import("../slices/authSlice");
        dispatch(logout());
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
  useResetPasswordMutation,
  useRefreshTokenMutation,
  useResendOtpMutation,
  useLogoutMutation,
} = authApi;
