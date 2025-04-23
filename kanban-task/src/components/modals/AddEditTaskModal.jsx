import React, { useMemo, useRef } from "react";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { AnimatePresence, motion } from "motion/react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { ReactSVG } from "react-svg";
import TaskStatusDropdown from "../TaskStatusDropdown";
import { addTask, updateTask, updateTaskStatus } from "../../redux/boardsSlice";
const EditAddTaskSchema = Yup.object().shape({
	taskTitle: Yup.string().required("Can't be empty!"),
	subtasks: Yup.array().of(
		Yup.object().shape({
			title: Yup.string().required("Can't be empty!"),
		})
	),
	status: Yup.string().required("Assign the status!"),
});

const AddEditTaskModal = ({ close, mode, task, column }) => {
	const dispatch = useDispatch();
	const subtaskListRef = useRef(null);

	const initialValues = useMemo(() => {
		if (mode === "edit") {
			return {
				taskTitle: task.title,
				description: task?.description || "",
				subtasks: task.subtasks,
				status: task.status,
			};
		} else if (mode === "addTask") {
			return {
				taskTitle: "",
				description: "",
				subtasks: [
					{ title: "", id: uuidv4(), isCompleted: false },
					{ title: "", id: uuidv4(), isCompleted: false },
				],
				status: column?.name || "",
			};
		} else {
			return {
				taskTitle: task?.title || "",
				description: task?.description || "",
				subtasks: task?.subtasks || [
					{ title: "", id: uuidv4(), isCompleted: false },
					{ title: "", id: uuidv4(), isCompleted: false },
				],
				status: "",
			};
		}
	}, [mode, task]);
	const formik = useFormik({
		initialValues,
		validationSchema: EditAddTaskSchema,
		onSubmit: (values) => {
			// console.log("Form Submitted:", values);
			// handleSave(values);
			close();
			if (mode !== "edit") {
				const newTask = {
					title: values.taskTitle,
					description: values.description,
					status: values.status,
					subtasks: values.subtasks,
					id: uuidv4(),
				};
				dispatch(addTask({ task: newTask }));
			} else {
				if (task.status !== values.status) {
					dispatch(updateTaskStatus({ task: task, columnName: values.status }));
				}
				const updatedTask = {
					...task,
					title: values.taskTitle,
					description: values.description,
					status: values.status,
					subtasks: values.subtasks,
				};

				dispatch(updateTask({ taskId: task.id, updatedTask: updatedTask }));
			}
		},
	});
	const addNewSubtask = () => {
		formik.setFieldValue("subtasks", [
			...formik.values.subtasks,
			{ title: "", isCompleted: false, id: uuidv4() },
		]);
		setTimeout(() => {
			if (subtaskListRef.current) {
				subtaskListRef.current.scrollTop = subtaskListRef.current.scrollHeight;
			}
		}, 0);
	};

	const removeSubtask = (index) => {
		const updated = [...formik.values.subtasks];
		updated.splice(index, 1);
		formik.setFieldValue("subtasks", updated);
	};
	const handleStatusChange = (newStatus) => {
		formik.setFieldValue("status", newStatus);
	};

	return (
		<motion.aside
			key="delteModal"
			initial="hidden"
			animate="show"
			exit="exit"
			variants={backdropVariant}
			transition={{
				duration: 0.7,
			}}
			onClick={close}
			className="inset-0 absolute z-30 w-screen h-screen bg-black/50 px-4 flex items-center gap-6
                       "
		>
			<motion.form
				onClick={(e) => e.stopPropagation()}
				onSubmit={formik.handleSubmit}
				variants={modalBlock}
				className="bg-white dark:bg-dark-grey w-full p-6 md:p-8 rounded-[6px] flex flex-col gap-6  max-w-[480px] mx-auto"
			>
				<h1 className="text-heading-l">{mode === "edit" ? "Edit Task" : "Add New Task"}</h1>
				<div className="flex flex-col gap-2">
					<label
						htmlFor="taskTitle"
						className="text-body-m text-medium-grey dark:text-white"
					>
						Title
					</label>
					<div
						className={`input-text w-full flex ${
							formik.errors.taskTitle && formik.touched.taskTitle && "border-red!"
						}`}
					>
						<input
							id="taskTitle"
							name="taskTitle"
							type="text"
							placeholder="e.g. Take coffee break"
							className="w-full outline-none placeholder:text-black/25 dark:placeholder:text-white/25"
							value={formik.values.taskTitle}
							onChange={formik.handleChange}
						/>
						{formik.errors.taskTitle && formik.touched.taskTitle && (
							<p className="text-red whitespace-nowrap pr-4 text-body-l leading-body-l font-medium">
								{formik.errors.taskTitle}
							</p>
						)}
					</div>
				</div>
				{/* Description */}
				<div className="flex flex-col gap-2">
					<label
						htmlFor="description"
						className="text-body-m text-medium-grey dark:text-white"
					>
						Description
					</label>
					<textarea
						id="description"
						name="description"
						placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
						className="input-text w-full outline-none min-h-[112px] placeholder:text-black/25 dark:placeholder:text-white/25"
						value={formik.values.description}
						onChange={formik.handleChange}
					/>
				</div>
				{/* Subtasks */}
				<div className="flex flex-col gap-2">
					<label className="text-body-m text-medium-grey dark:text-white">Subtasks</label>
					<div className="flex flex-col gap-3">
						<div
							className="flex flex-col gap-3 max-h-[200px] overflow-y-auto"
							ref={subtaskListRef}
						>
							<AnimatePresence>
								{formik.values.subtasks.map((subtask, index) => (
									<SubtaskInput
										key={subtask.id}
										subtask={subtask}
										index={index}
										formik={formik}
										onRemove={() => removeSubtask(index)}
									/>
								))}
							</AnimatePresence>
						</div>
						<button
							type="button"
							onClick={() => addNewSubtask()}
							className="w-full bg-purple/10 text-purple py-2.5 rounded-[20px] dark:bg-white text-body-l leading-body-l cursor-pointer"
						>
							+ Add New Subtask
						</button>
					</div>
				</div>
				{/* Status */}
				<div className="flex flex-col gap-2">
					<label className="text-body-m text-medium-grey dark:text-white">Status</label>
					<TaskStatusDropdown
						task={formik.values.status}
						column={column}
						formikFunction={handleStatusChange}
					/>
				</div>
				<button
					type="submit"
					className="w-full bg-purple text-white py-2 rounded-[20px] text-body-l leading-body-l"
				>
					{mode === "edit" ? "Save Changes" : "Create Task"}
				</button>
			</motion.form>
		</motion.aside>
	);
};

export default AddEditTaskModal;

const backdropVariant = {
	hidden: {
		opacity: 0,
	},
	show: {
		opacity: 1,
	},
	exit: {
		opacity: 0,
	},
};
const modalBlock = {
	hidden: {
		scaleY: 0,
		scaleX: 2,
	},
	show: {
		scaleY: 1,
		scaleX: 1,
		transition: {
			type: "spring",
			duration: 1,
		},
	},
	exit: {
		scaleY: 0,
		scaleX: 2,
		transition: {
			type: "spring",
			duration: 0.5,
		},
	},
};

const SubtaskInput = ({ subtask, index, formik, onRemove }) => {
	const error =
		formik.errors.subtasks &&
		formik.errors.subtasks[index] &&
		formik.touched.subtasks &&
		formik.touched.subtasks[index];

	return (
		<motion.div
			initial={{ x: -100, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: 100, opacity: 0 }}
			transition={{ type: "spring", duration: 0.5, bounce: 0.5 }}
			key={subtask.id}
			className="flex gap-4 items-center"
		>
			<div className={`input-text w-full flex items-center ${error ? "border-red!" : ""}`}>
				<input
					autoComplete="off"
					className="w-full outline-none placeholder:text-white/25"
					type="text"
					name={`subtasks[${index}].title`}
					value={subtask.title}
					onChange={formik.handleChange}
					placeholder={index === 0 ? "e.g. Make coffee" : "e.g. Drink coffee & smile"}
				/>
				{error && (
					<div className="text-red whitespace-nowrap pr-4">
						{formik.errors.subtasks[index].title}
					</div>
				)}
			</div>
			<button type="button" className="group cursor-pointer" onClick={onRemove}>
				<ReactSVG
					src="/assets/icon-cross.svg"
					className="fill-medium-grey group-hover:fill-red"
				/>
			</button>
		</motion.div>
	);
};
