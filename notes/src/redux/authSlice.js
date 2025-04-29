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
			users.push({ email, password });
			localStorage.setItem("users", JSON.stringify(users));
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
