import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ReactSVG } from "react-svg";
import { useDispatch } from "react-redux";
import { editBoard } from "../redux/boardsSlice";

// Define the validation schema before using it
const EditBoardSchema = Yup.object().shape({
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

const EditBoardModal = ({ close, board, modal }) => {
	const dispatch = useDispatch();
	const formik = useFormik({
		initialValues: {
			boardName: board.name,
			columns: board.columns,
		},
		enableReinitialize: true,
		validationSchema: EditBoardSchema,
		onSubmit: (values) => {
			const updatedBoard = {
				...board,
				name: values.boardName,
				columns: values.columns,
			};
			dispatch(editBoard(updatedBoard));
			close(false);
		},
		context: { columns: board.columns }, // Pass columns into context here
	});

	return (
		<AnimatePresence>
			{modal && (
				<motion.aside
					key="deleteModal"
					initial="hidden"
					animate="show"
					exit="exit"
					transition={{
						type: "spring",
						duration: 1.5,
					}}
					onClick={() => close(false)}
					variants={backdropVariant}
					className="inset-0 absolute z-0 w-screen h-screen bg-black/50 px-4 flex items-center gap-6"
				>
					<motion.form
						onClick={(e) => e.stopPropagation()}
						onSubmit={formik.handleSubmit}
						variants={modalBlock}
						className="bg-white dark:bg-dark-grey w-full p-6 pb-8 rounded-[6px] flex flex-col gap-6"
					>
						<h3 className="text-l leading-l">Edit Board</h3>
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
									className="outline-none w-full"
									name="boardName"
									type="text"
									placeholder="E.g Web Design"
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
													className="w-full outline-none"
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
		</AnimatePresence>
	);
};

export default EditBoardModal;

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
