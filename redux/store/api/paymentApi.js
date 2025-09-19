// redux/store/api/paymentApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = Cookies.get("accessToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Payment", "Distro"],
  endpoints: (builder) => ({
    // Film Purchase - Stripe
    createStripePurchaseCheckout: builder.mutation({
      query: (data) => ({
        url: "/flims/stripe/create-purchase-checkout-session",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payment"],
    }),

    // Film Purchase - PayPal
    createPayPalPurchaseCheckout: builder.mutation({
      query: (data) => ({
        url: "/flims/paypal/create-purchase-checkout",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payment"],
    }),

    // Film Purchase - ReelBux
    purchaseFilmWithReelBux: builder.mutation({
      query: (data) => ({
        url: "/flims/reelbux/purchase",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payment"],
    }),

    // Film Rental - Stripe
    createStripeRentalCheckout: builder.mutation({
      query: (data) => ({
        url: "/flims/stripe/create-rented-checkout-session",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payment"],
    }),

    // Film Rental - PayPal
    createPayPalRentalCheckout: builder.mutation({
      query: (data) => ({
        url: "/flims/paypal/create-rented-checkout",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payment"],
    }),

    // Film Rental - ReelBux
    rentFilmWithReelBux: builder.mutation({
      query: (data) => ({
        url: "/flims/reelbux/rented",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payment"],
    }),

    // AI Subscription - Stripe
    createStripeSubscriptionCheckout: builder.mutation({
      query: (data) => ({
        url: "/payment/stripe/create-checkout-session",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payment"],
    }),

    // AI Subscription - PayPal
    createPayPalSubscriptionCheckout: builder.mutation({
      query: (data) => ({
        url: "/payment/paypal/checkout-create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payment"],
    }),

    // AI Subscription - ReelBux
    createReelBuxSubscriptionCheckout: builder.mutation({
      query: (data) => ({
        url: "/payment/reelbux/checkout-create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payment"],
    }),

    // Add Funds - Stripe
    createStripeAddFundsCheckout: builder.mutation({
      query: (data) => ({
        url: "/payment/stripe/create-add-funds-checkout-session",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payment"],
    }),

    // Add Funds - PayPal
    createPayPalAddFundsCheckout: builder.mutation({
      query: (data) => ({
        url: "/payment/paypal/create-addfunds-checkout",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payment"],
    }),

    // Transfer Distro to ReelBux
    transferDistroToReelBux: builder.mutation({
      query: (data) => ({
        url: "/payment/transfer/distro-to-reelbux",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payment", "Distro"],
    }),
  }),
});

export const {
  useCreateStripePurchaseCheckoutMutation,
  useCreatePayPalPurchaseCheckoutMutation,
  usePurchaseFilmWithReelBuxMutation,
  useCreateStripeRentalCheckoutMutation,
  useCreatePayPalRentalCheckoutMutation,
  useRentFilmWithReelBuxMutation,
  useCreateStripeSubscriptionCheckoutMutation,
  useCreatePayPalSubscriptionCheckoutMutation,
  useCreateReelBuxSubscriptionCheckoutMutation,
  useCreateStripeAddFundsCheckoutMutation,
  useCreatePayPalAddFundsCheckoutMutation,
  useTransferDistroToReelBuxMutation,
} = paymentApi;
