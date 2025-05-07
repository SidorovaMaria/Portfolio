import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	user: null,
	token: localStorage.getItem("token") || null,
	isLoading: false,
	error: null,
};
export const fetchUser = createAsyncThunk("auth/fetchUser", async (_, { rejectWithValue }) => {
	try {
		const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}

		// Send request to the backend to get user details
		const response = await axios.get("/api/users/me", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return { token, user: response.data }; // Return token and user data
	} catch (error) {
		return rejectWithValue("Failed to fetch user", error);
	}
});

export const signup = createAsyncThunk("auth/signup", async (userData, { rejectWithValue }) => {
	try {
		// Fixed endpoint if needed
		const response = await axios.post("/api/users/signup", userData); // Check the correct URL for your backend
		const { token } = response.data;

		// Store token in localStorage
		localStorage.setItem("token", token);

		const userResponse = await axios.get("/api/users/me", {
			headers: { Authorization: `Bearer ${token}` },
		});

		// Return both token and user data
		return { token, user: userResponse.data };
	} catch (error) {
		// Handle errors
		return rejectWithValue(error.response?.data?.msg || "Signup failed");
	}
});

export const login = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
	try {
		const response = await axios.post("/api/users/login", credentials);
		const { token } = response.data;

		localStorage.setItem("token", token);

		const userResponse = await axios.get("/api/users/me", {
			headers: { Authorization: `Bearer ${token}` },
		});

		return { token, user: userResponse.data };
	} catch (error) {
		return rejectWithValue(error.response?.data?.msg || "Login failed");
	}
});
export const setProfile = createAsyncThunk(
	"auth/setProfile",
	async ({ name, profileImg }, { rejectWithValue, getState }) => {
		try {
			const { token } = getState().auth;

			const formData = new FormData();
			formData.append("name", name);

			if (profileImg) {
				// Add the profile image if it's available
				formData.append("profileImg", profileImg);
			}

			// Send the formData to the backend
			const response = await axios.put("/api/users/profile", formData, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "multipart/form-data", // Important header
				},
			});

			return response.data.user; // Return updated user from the response
		} catch (error) {
			return rejectWithValue(error.response?.data?.msg || "Profile update failed");
		}
	}
);

// Slice definition
const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: (state) => {
			localStorage.removeItem("token");
			state.user = null;
			state.token = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.token = action.payload.token;
				state.user = action.payload.user;
				state.error = null;
			})
			.addCase(fetchUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
				state.token = null;
				state.user = null;
			})
			// Login
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload.user;
				state.token = action.payload.token;
				state.error = null;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})

			// Register
			.addCase(signup.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(signup.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload.user;
				state.token = action.payload.token;
				state.error = null;
			})
			.addCase(signup.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			// Set Profile
			.addCase(setProfile.fulfilled, (state, action) => {
				// Handle the successful profile update
				state.user.name = action.payload.name;
				state.user.profileImg = action.payload.profileImg || state.user.profileImg; // Ensure fallback if no image
			})
			.addCase(setProfile.rejected, (state, action) => {
				console.error(action.payload);
			});
	},
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
