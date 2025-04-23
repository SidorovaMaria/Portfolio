import React, { useEffect, useState } from "react";
import Header from "./sections/Header";
import BoardTasks from "./sections/BoardTasks";
import { useDispatch, useSelector } from "react-redux";
import { loadBoards } from "./redux/boardsSlice";
import DesktopNavBar from "./sections/DesktopNavBar";
import { AnimatePresence } from "motion/react";
import AddEditBoardModal from "./components/modals/AddEditBoardModal";
import DeleteModal from "./components/modals/DeleteModal";
import AddEditTaskModal from "./components/modals/AddEditTaskModal";

function App() {
	const dispatch = useDispatch();
	const { boards, activeBoard } = useSelector((state) => state.boards);

	const [isLoading, setisLoading] = useState(true);
	const [addEditBoard, setAddEditBoard] = useState({
		mode: null, //addColumn,Edit,Delete
		open: false,
	});
	const [addEditTask, setAddEditTask] = useState({
		mode: null, //addTask,Edit,Delete
		open: false,
		column: null,
	});

	useEffect(() => {
		dispatch(loadBoards()); //Check Storage, update App
		setisLoading(false);
	}, [dispatch]);
	if (isLoading) {
		return <h1>Loading task data!</h1>;
	}

	const openModal = (mode) => {
		setAddEditBoard((prev) => ({
			...prev,
			mode: mode,
			open: true,
		}));
	};
	const closeModal = () => {
		setAddEditBoard((prev) => ({
			...prev,
			mode: null,
			open: false,
		}));
	};
	const openTaskModal = (mode, column, task) => {
		setAddEditTask((prev) => ({
			...prev,
			mode: mode,
			open: true,
			column: column,
			task: task,
		}));
	};
	const closeTaskModal = () => {
		setAddEditTask((prev) => ({
			...prev,
			mode: null,
			open: false,
		}));
	};

	return (
		<div className="flex flex-col">
			<Header openModal={openModal} openTaskModal={openTaskModal} />
			<div className="flex">
				<DesktopNavBar openModal={openModal} />
				<BoardTasks openModal={openModal} openTaskModal={openTaskModal} />
			</div>

			{/* Modals */}
			<AnimatePresence>
				{addEditBoard.open &&
					(addEditBoard.mode === "delete" ? (
						<DeleteModal mode={"board"} component={activeBoard} close={closeModal} />
					) : (
						<AddEditBoardModal
							mode={addEditBoard.mode}
							board={activeBoard}
							close={closeModal}
						/>
					))}
			</AnimatePresence>
			<AnimatePresence>
				{addEditTask.open &&
					(addEditTask.mode === "delete" ? (
						<DeleteModal
							mode={"task"}
							component={addEditTask.task}
							close={closeTaskModal}
						/>
					) : (
						<AddEditTaskModal
							mode={addEditTask.mode}
							task={addEditTask.task}
							close={closeTaskModal}
							column={addEditTask.column}
						/>
					))}
			</AnimatePresence>
		</div>
	);
}

export default App;
