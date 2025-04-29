import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Layout from "./Layout";

import AllNotes from "./pages/AllNotes";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import Search from "./pages/Search";
import Archived from "./pages/Archived";
import Tags from "./pages/Tags";
import Settings from "./pages/Settings";
import Tag from "./pages/Tag";
function App() {
	function PrivateRoute({ children }) {
		const isAutnenticated = useSelector((state) => state.auth.isAutnenticated);
		return isAutnenticated ? children : <Navigate to="/login" />;
	}
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<PrivateRoute>
							<Layout />
						</PrivateRoute>
					}
				>
					<Route index element={<AllNotes />} />
					<Route path="/search" element={<Search />} />
					<Route path="/archived" element={<Archived />} />
					<Route path="/tags/:tag" element={<Tag />} />
					<Route path="/tags" element={<Tags />} />
					<Route path="/settings" element={<Settings />} />
				</Route>
				{/* Auhtnetication Routes */}
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				{/* TODO Fotrgot Password */}
				{/* TODO Reset Password */}
				{/* Default Redirect for invalid routes */}
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
