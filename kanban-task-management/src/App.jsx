import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadBoards } from "./redux/boardsSlice";
import BoardTasks from "./sections/BoardTasks";
import MobileNavbar from "./sections/MobileNavbar";

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
		<div className="flex flex-col md:flex-row">
			<MobileNavbar />
			<BoardTasks />
		</div>
	);
}

export default App;
