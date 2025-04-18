import React from "react";
import { AnimatePresence, delay, motion } from "motion/react";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { createPortal } from "react-dom";
import { useFormik } from "formik";
import { ReactSVG } from "react-svg";
import { useDispatch } from "react-redux";
import { addBoard, editBoard } from "../redux/boardsSlice";

const EditAddBoardSchema = Yup.object().shape({
	boardName: Yup.string().required("Can't be empty!"),
	columns: Yup.array().of(
		Yup.object().shape({
			name: Yup.string()
				.required("Can't be empty!")
				.test("unique", "Dublicate column", function (value) {
					const columns = this.options.context?.columns || [];
					const matches = columns.filter((col) => col.name === value);
					return matches.length <= 1;
				}),
		})
	),
});

const AddEditBoardModal = ({ close, modal, board, mode }) => {
	const dispatch = useDispatch();

	const initialValues = React.useMemo(() => {
		if (mode === "edit") {
			return {
				boardName: board.name,
				columns: board.columns,
			};
		} else {
			return {
				boardName: "",
				columns: [
					{ name: "Todo", id: uuidv4() },
					{ name: "Doing", id: uuidv4() },
				],
			};
		}
	}, [mode, board]);

	const formik = useFormik({
		initialValues,
		validationSchema: EditAddBoardSchema,
		onSubmit: (values) => {
			if (mode === "edit") {
				const updatedBoard = {
					...board,
					name: values.boardName,
					columns: values.columns,
				};
				dispatch(editBoard(updatedBoard));
			} else {
				const newBoard = {
					name: values.boardName,
					columns: values.columns,
					id: uuidv4(),
					tasks: [],
				};
				dispatch(addBoard(newBoard));
			}
			close();
		},
		enableReinitialize: true,
		context: { columns: initialValues.columns },
	});
	return createPortal(
		<AnimatePresence>
			{modal && (
				<motion.aside
					key="deleteModal"
					initial="hidden"
					animate="show"
					exit="exit"
					transition={{
						duration: 0.7,
					}}
					onClick={() => close(false)}
					variants={backdropVariant}
					className="inset-0 absolute z-30 w-screen h-screen bg-black/50 px-4 flex items-center gap-6
                   "
				>
					<motion.form
						onClick={(e) => e.stopPropagation()}
						onSubmit={formik.handleSubmit}
						variants={modalBlock}
						transition={{ delay: 0.5 }}
						className="bg-white dark:bg-dark-grey w-full p-6 md:p-8 pb-8 rounded-[6px] flex flex-col gap-6  md:max-w-[480px] md:mx-auto"
					>
						<h3 className="text-l leading-l">
							{mode === "edit" ? "Edit Board" : "Add New Board"}
						</h3>
						<div className="flex flex-col gap-2">
							<label
								htmlFor="boardName"
								className="text-body-m leading-body-m text-medium-grey dark:text-white"
							>
								Board Name
							</label>
							<div
								className={`input-text w-full flex ${formik.errors.boardName && "border-red"}`}
							>
								<input
									id="boardName"
									className="outline-none w-full placeholder:text-white/25"
									name="boardName"
									type="text"
									placeholder="e.g. Web Design"
									value={formik.values.boardName}
									onChange={formik.handleChange}
								/>
								{formik.errors.boardName && (
									<p className="text-red whitespace-nowrap pr-4 text-body-l leading-body-l font-medium">
										{formik.errors.boardName}
									</p>
								)}
							</div>
						</div>
						<div className="flex flex-col gap-2">
							<label
								htmlFor="boardName"
								className="text-body-m leading-body-m text-medium-grey dark:text-white"
							>
								Board Columns
							</label>
							<div className="flex flex-col gap-3">
								<AnimatePresence>
									{formik.values.columns.map((column, index) => (
										<motion.div
											initial={{ x: -100, opacity: 0 }}
											animate={{ x: 0, opacity: 1 }}
											exit={{ x: 100, opacity: 0 }}
											transition={{
												type: "spring",
												duration: 0.5,
												bounce: 0.5,
											}}
											key={column.id} // Make sure column is unique by id
											className="flex gap-4 items-center"
										>
											<div
												className={`input-text w-full flex items-center ${
													formik.errors.columns &&
													formik.errors.columns[index] &&
													formik.touched.columns &&
													formik.touched.columns[index] &&
													"border-red"
												} `}
											>
												<input
													className="w-full outline-none placeholder:text-white/25"
													type="text"
													name={`columns[${index}].name`}
													value={column.name}
													onChange={formik.handleChange}
													placeholder="e.g. Todo"
												/>
												{formik.errors.columns &&
													formik.errors.columns[index] &&
													formik.touched.columns &&
													formik.touched.columns[index] && (
														<div className="text-red whitespace-nowrap pr-4">
															{formik.errors.columns[index].name}
														</div>
													)}
											</div>
											<button
												type="button"
												className="group cursor-pointer"
												onClick={() => {
													const newCols = [...formik.values.columns];
													newCols.splice(index, 1);
													formik.setFieldValue("columns", newCols);
												}}
											>
												<ReactSVG
													src="/assets/icon-cross.svg"
													className="fill-medium-grey group-hover:fill-red"
												/>
											</button>
										</motion.div>
									))}
								</AnimatePresence>
								<button
									type="button"
									className="w-full bg-purple/10 text-purple py-2.5 rounded-[20px] dark:bg-white text-body-l leading-body-l cursor-pointer"
									onClick={() =>
										formik.setFieldValue("columns", [
											...formik.values.columns,
											{ name: "", tasks: [], id: uuidv4() },
										])
									}
								>
									+ Add New Column
								</button>
							</div>
						</div>
						<button
							type="submit"
							className="cursor-pointer w-full bg-purple text-white py-2.5 rounded-[20px] text-body-l leading-body-l hover:bg-purple-hover"
						>
							Save Changes
						</button>
					</motion.form>
				</motion.aside>
			)}
		</AnimatePresence>,
		document.body
	);
};

export default AddEditBoardModal;

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
			delay: 0.7, //So it updates first before showing
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
