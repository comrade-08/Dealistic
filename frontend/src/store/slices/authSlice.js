import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios.js";
import {jwtDecode} from "jwt-decode"; // ✅ correct import
import toast from "react-hot-toast";

// --- Login ---
export const login = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const res = await api.post("/auth/login", credentials);
    const { accessToken, user } = res.data;
    localStorage.setItem("accessToken", accessToken);
    return { user, accessToken };
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Login failed");
  }
});

// --- Register ---
export const register = createAsyncThunk("auth/register", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post("/auth/register", payload);
    const { accessToken, user } = res.data;
    localStorage.setItem("accessToken", accessToken);
    return { user, accessToken };
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Registration failed");
  }
});

// --- Refresh Token ---
export const refreshToken = createAsyncThunk("auth/refresh", async (_, { rejectWithValue }) => {
  try {
    const res = await api.post("/auth/refresh");
    const { accessToken } = res.data;
    localStorage.setItem("accessToken", accessToken);
    return accessToken;
  } catch (err) {
    localStorage.removeItem("accessToken");
    return rejectWithValue("Session expired");
  }
});

// --- Logout ---
export const logout = createAsyncThunk("auth/logout", async (_, { dispatch }) => {
  try {
    await api.post("/auth/logout"); // optional: backend clears refresh cookie
    localStorage.removeItem("accessToken");
    dispatch(clearUser());
    window.location.href = "/login";
  } catch {
    toast.error('Logout failed!')
  }
});

// --- Initialize user from token (if exists) ---
const token = localStorage.getItem("accessToken");
let initialUser = null;
if (token) {
  try {
    const decoded = jwtDecode(token);
    initialUser = { id: decoded.id, role: decoded.role, name: decoded.name };
  } catch {
    localStorage.removeItem("accessToken");
  }
}

// --- Slice ---
const slice = createSlice({
  name: "auth",
  initialState: { user: initialUser, status: "idle", error: null },
  reducers: {
    clearUser(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.status = "succeeded";
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Register
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.status = "succeeded";
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Refresh token
      .addCase(refreshToken.fulfilled, (state, action) => {
        try {
          const decoded = jwtDecode(action.payload);
          state.user = { id: decoded.id, role: decoded.role, name: decoded.name };
        } catch {
          state.user = null;
        }
      })
      .addCase(refreshToken.rejected, (state) => {
        state.user = null;
      });
  },
});

export const { clearUser } = slice.actions;
export default slice.reducer;
