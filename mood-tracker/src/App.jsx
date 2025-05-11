import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegiserPage";
import SetProfilePage from "./pages/SetProfilePage";
import { fetchUser } from "./redux/authSlice";
import { useEffect } from "react";

function App() {
	const { token, user } = useSelector((state) => state.auth);


	const ProtectedRoute = ({ children }) => {
		if (!token) {
			return <Navigate to="/signIn" />;
		}
		return children;
	};
	const SetProfileRoute = ({ children }) => {
		if (!user?.name) {
			return children;
		}
		return <Navigate to="/" />;
	};
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<ProtectedRoute>
							<HomePage />
						</ProtectedRoute>
					}
				/>
				<Route path="/signIn" element={<LoginPage />} />
				<Route path="/signUp" element={<RegisterPage />} />
				<Route
					path="/setProfile"
					element={
						<ProtectedRoute>
							<SetProfileRoute>
								<SetProfilePage />
							</SetProfileRoute>
						</ProtectedRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
