// redux/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import { authApi } from "./api/authApi";
import { usersApi } from "./api/usersApi";
import { filmsApi } from "./api/filmsApi";
import { reelbuxApi } from "./api/reelbuxApi";
import { distroApi } from "./api/distroApi";
import { paymentApi } from "./api/paymentApi";
import { adminApi } from "./api/adminApi";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [filmsApi.reducerPath]: filmsApi.reducer,
    [reelbuxApi.reducerPath]: reelbuxApi.reducer,
    [distroApi.reducerPath]: distroApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
        ],
      },
    }).concat(
      authApi.middleware,
      usersApi.middleware,
      filmsApi.middleware,
      reelbuxApi.middleware,
      distroApi.middleware,
      paymentApi.middleware,
      adminApi.middleware
    ),
});
