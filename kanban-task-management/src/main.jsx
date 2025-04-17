import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";

import AppRouter from "./app/AppRouter.jsx";
import store from "./app/store.js";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider store={store}>
			<AppRouter />
		</Provider>
	</StrictMode>
);
