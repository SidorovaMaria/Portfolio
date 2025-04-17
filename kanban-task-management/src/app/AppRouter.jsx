import {
	createRoutesFromElements,
	Route,
	RouterProvider,
	createBrowserRouter,
	Navigate,
} from "react-router";

import React from "react";
import BoardTasks from "../sections/BoardTasks";
import App from "../App";
const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index element={<Navigate to="platform-launch" />} />
			<Route path=":slug" element={<BoardTasks />} />
		</Route>
	)
);

const AppRouter = () => {
	return <RouterProvider router={router} />;
};

export default AppRouter;
