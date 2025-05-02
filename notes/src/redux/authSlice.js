import { createSlice } from "@reduxjs/toolkit";
const user = JSON.parse(localStorage.getItem("loggedInUser")) || null;

const authSlice = createSlice({
	name: "auth",
	initialState: {
		user: user,
		isAutnenticated: user ? true : false,
	},
	reducers: {
		register: (state, action) => {
			const { email, password } = action.payload;
			const users = JSON.parse(localStorage.getItem("users")) || [];

			// Check for duplicate email
			if (users.some((user) => user.email === email)) {
				alert("User already exists with this email.");
				return;
			}

			const newUser = { email, password };
			users.push(newUser);
			localStorage.setItem("users", JSON.stringify(users));

			state.user = newUser;
			state.isAutnenticated = true;
			localStorage.setItem("loggedInUser", JSON.stringify(newUser));
		},
		login: (state, action) => {
			const { email, password } = action.payload;
			const users = JSON.parse(localStorage.getItem("users")) || [];
			const foundUser = users.find(
				(user) => user.email === email && user.password === password
			);
			if (foundUser) {
				state.user = foundUser;
				state.isAutnenticated = true;
				localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
			} else {
				alert("Invalid credentials");
			}
		},
		logout: (state) => {
			state.user = null;
			state.isAutnenticated = false;
			localStorage.removeItem("loggedInUser");
		},
	},
});
export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
