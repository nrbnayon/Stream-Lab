// redux/store/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  role: null,
  userId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { access_token, refresh_token, user_id, role, user, full_name } =
        action.payload;

      // Set user info
      state.user = user || { id: user_id, role, full_name };
      state.isAuthenticated = true;
      state.role = role;
      state.userId = user_id;

      // Store tokens and user info in cookies with longer expiration
      Cookies.set("accessToken", access_token, { expires: 365 });
      Cookies.set("refreshToken", refresh_token, { expires: 365 });
      Cookies.set("userRole", role, { expires: 365 });
      Cookies.set("userId", user_id, { expires: 365 });
    },

    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      if (action.payload?.role) {
        state.role = action.payload.role;
      }
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.role = null;
      state.userId = null;

      // Clear all cookies
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      Cookies.remove("userRole");
      Cookies.remove("userId");
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        // Update role if it's being changed
        if (action.payload.role) {
          state.role = action.payload.role;
          Cookies.set("userRole", action.payload.role, { expires: 365 });
        }
      }
    },

    // New action to initialize auth state from cookies (useful for page refreshes)
    initializeAuth: (state) => {
      const accessToken = Cookies.get("accessToken");
      const userRole = Cookies.get("userRole");
      const userId = Cookies.get("userId");

      if (accessToken && userRole && userId) {
        state.isAuthenticated = true;
        state.role = userRole;
        state.userId = userId;
        // Set minimal user object if we don't have full user data
        if (!state.user) {
          state.user = { id: userId, role: userRole };
        }
      }
    },
  },
});

export const {
  setCredentials,
  setUser,
  logout,
  setLoading,
  updateUser,
  initializeAuth,
} = authSlice.actions;
export default authSlice.reducer;

// // redux/store/slices/authSlice.js
// import { createSlice } from "@reduxjs/toolkit";
// import Cookies from "js-cookie";

// const initialState = {
//   user: null,
//   isAuthenticated: false,
//   isLoading: false,
//   role: null,
//   userId: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setCredentials: (state, action) => {
//       const { access_token, refresh_token, user_id, role, user } = action.payload;

//       // Set user info
//       state.user = user || { id: user_id, role };
//       state.isAuthenticated = true;
//       state.role = role;
//       state.userId = user_id;

//       // Store tokens and user info in cookies with longer expiration
//       Cookies.set("accessToken", access_token, { expires: 365 });
//       Cookies.set("refreshToken", refresh_token, { expires: 365 });
//       Cookies.set("userRole", role, { expires: 365 });
//       Cookies.set("userId", user_id, { expires: 365 });
//     },

//     setUser: (state, action) => {
//       state.user = action.payload;
//       state.isAuthenticated = true;
//       if (action.payload?.role) {
//         state.role = action.payload.role;
//       }
//     },

//     logout: (state) => {
//       state.user = null;
//       state.isAuthenticated = false;
//       state.role = null;
//       state.userId = null;

//       // Clear all cookies
//       Cookies.remove("accessToken");
//       Cookies.remove("refreshToken");
//       Cookies.remove("userRole");
//       Cookies.remove("userId");
//     },

//     setLoading: (state, action) => {
//       state.isLoading = action.payload;
//     },

//     updateUser: (state, action) => {
//       if (state.user) {
//         state.user = { ...state.user, ...action.payload };
//         // Update role if it's being changed
//         if (action.payload.role) {
//           state.role = action.payload.role;
//           Cookies.set("userRole", action.payload.role, { expires: 365 });
//         }
//       }
//     },

//     // New action to initialize auth state from cookies (useful for page refreshes)
//     initializeAuth: (state) => {
//       const accessToken = Cookies.get("accessToken");
//       const userRole = Cookies.get("userRole");
//       const userId = Cookies.get("userId");

//       if (accessToken && userRole && userId) {
//         state.isAuthenticated = true;
//         state.role = userRole;
//         state.userId = userId;
//         // Set minimal user object if we don't have full user data
//         if (!state.user) {
//           state.user = { id: userId, role: userRole };
//         }
//       }
//     },
//   },
// });

// export const { setCredentials, setUser, logout, setLoading, updateUser, initializeAuth } =
//   authSlice.actions;
// export default authSlice.reducer;
