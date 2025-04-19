import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loadBoards } from "./redux/boardsSlice";
import BoardTasks from "./sections/BoardTasks";
import MobileNavbar from "./sections/MobileNavbar";
import DesktopHeader from "./sections/DesktopHeader";
import DesktopNavbar from "./sections/DesktopNavbar";

function App() {
	const dispatch = useDispatch();
	const [isLoading, setisLoading] = useState(true);
	useEffect(() => {
		dispatch(loadBoards()); //Check Storage, update App
		setisLoading(false);
	}, [dispatch]);
	if (isLoading) {
		return <h1>Loading task data!</h1>;
	}

	return (
		<div className="flex flex-col">
			<MobileNavbar />
			<DesktopHeader />
			<div className="flex ">
				<DesktopNavbar />
				<BoardTasks />
			</div>
		</div>
	);
}

export default App;
