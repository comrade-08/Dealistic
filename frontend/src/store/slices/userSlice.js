import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios.js";

// 🔹 Fetch all users (Admin only)
export const fetchUsers = createAsyncThunk("users/fetchAll", async (_, thunkAPI) => {
  try {
    const res = await api.get("/users");
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch users");
  }
});

// 🔹 Fetch logged-in user profile
export const fetchUserProfile = createAsyncThunk("users/fetchProfile", async (_, thunkAPI) => {
  try {
    const res = await api.get("/users/profile");
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to load profile");
  }
});

// 🔹 Update user role (Admin only)
export const updateUserRole = createAsyncThunk(
  "users/updateRole",
  async ({ id, role }, thunkAPI) => {
    try {
      const res = await api.put(`/users/${id}/role`, { role });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to update role");
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    items: [],
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Role
      .addCase(updateUserRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.loading = false;
        // Update user role in the items
        const updated = action.payload;
        state.items = state.items.map((u) => (u._id === updated._id ? updated : u));
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserError } = userSlice.actions;
export default userSlice.reducer;
