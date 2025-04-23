import { useFormik } from "formik";
import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { AnimatePresence, motion } from "motion/react";
import { ReactSVG } from "react-svg";
import { addBoard, editBoard } from "../../redux/boardsSlice";
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

const AddEditBoardModal = ({ close, mode = null, board }) => {
	const dispatch = useDispatch();
	const initialValues = useMemo(() => {
		if (mode === "edit") {
			return {
				boardName: board.name,
				columns: board.columns,
			};
		} else if (mode === "addColumn") {
			return {
				boardName: board.name,
				columns: [...board.columns, { name: "", id: uuidv4(), tasks: [] }],
			};
		} else {
			return {
				boardName: "",
				columns: [
					{ name: "Todo", id: uuidv4(), tasks: [] },
					{ name: "Doing", id: uuidv4(), tasks: [] },
				],
			};
		}
	}, [mode, board]);

	const formik = useFormik({
		initialValues,
		validationSchema: EditAddBoardSchema,
		onSubmit: (values) => {
			const payload = {
				...board,
				name: values.boardName,
				columns: values.columns,
			};
			if (mode === "add") {
				dispatch(addBoard({ ...payload, id: uuidv4() }));
			} else {
				dispatch(editBoard(payload));
			}
			close();
			mode = "null";
		},
		enableReinitialize: true,
		context: { columns: initialValues.columns },
	});
	const addNewColumn = () => {
		formik.setFieldValue("columns", [
			...formik.values.columns,
			{ name: "", tasks: [], id: uuidv4() },
		]);
	};

	const removeColumn = (index) => {
		const updated = [...formik.values.columns];
		updated.splice(index, 1);
		formik.setFieldValue("columns", updated);
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
			aria-label="Close Modal"
			onClick={() => {
				close();
			}}
			className="inset-0 fixed z-30 w-screen h-screen bg-black/50 px-4 flex items-center gap-6
                   "
		>
			<motion.form
				aria-label={`${mode} board`}
				onClick={(e) => e.stopPropagation()}
				onSubmit={formik.handleSubmit}
				variants={modalBlock}
				transition={{ delay: 0.5 }}
				className="bg-white dark:bg-dark-grey w-full p-6 md:p-8 rounded-[6px] flex flex-col gap-6  max-w-[480px] mx-auto"
			>
				<h3 className="text-l leading-l">
					{mode === "add" ? "Add New Board" : "Edit Board"}
				</h3>
				{/* Board Name */}
				<div className="flex flex-col gap-2">
					<label
						htmlFor="boardName"
						className="text-body-m leading-body-m text-medium-grey dark:text-white"
					>
						Board Name
					</label>
					<div
						className={`input-text w-full flex ${
							formik.errors.boardName && "border-red!"
						}`}
					>
						<input
							aria-label="Board Name"
							id="boardName"
							className="outline-none w-full placeholder:text-black/25 dark:placeholder:text-white/25"
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
				{/* BoardColumns */}
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
								<ColumnInput
									key={column.id}
									column={column}
									index={index}
									formik={formik}
									onRemove={() => removeColumn(index)}
								/>
							))}
						</AnimatePresence>
						{/* Add Column Btn */}
						<button
							aria-label="Add New Column"
							type="button"
							className="w-full bg-purple/10 text-purple py-2.5 rounded-[20px] dark:bg-white text-body-l leading-body-l cursor-pointer not-dark:hover:bg-[#635FC7]/25"
							onClick={addNewColumn}
						>
							+ Add New Column
						</button>
					</div>
				</div>
				{/* Submit */}
				<button
					aria-label="Submit Form"
					type="submit"
					className="cursor-pointer w-full bg-purple text-white py-2.5 rounded-[20px] text-body-l leading-body-l hover:bg-purple-hover"
				>
					{mode === "add" ? "Create New Board" : "Save Changes"}
				</button>
			</motion.form>
		</motion.aside>
	);
};

export default AddEditBoardModal;

// Animation Variants
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

const ColumnInput = ({ column, index, formik, onRemove }) => {
	const error =
		formik.errors.columns &&
		formik.errors.columns[index] &&
		formik.touched.columns &&
		formik.touched.columns[index];

	return (
		<motion.div
			initial={{ x: -100, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: 100, opacity: 0 }}
			transition={{ type: "spring", duration: 0.5, bounce: 0.5 }}
			key={column.id}
			className="flex gap-4 items-center"
		>
			<div className={`input-text w-full flex items-center ${error ? "border-red!" : ""}`}>
				<input
					aria-label="Column Name"
					className="w-full outline-none placeholder:text-white/25"
					type="text"
					name={`columns[${index}].name`}
					value={column.name}
					onChange={formik.handleChange}
					placeholder="e.g. Todo"
				/>
				{error && (
					<div className="text-red whitespace-nowrap pr-4">
						{formik.errors.columns[index].name}
					</div>
				)}
			</div>
			<button
				type="button"
				aria-label="Remove Column"
				className="group cursor-pointer"
				onClick={onRemove}
			>
				<ReactSVG
					src="/assets/icon-cross.svg"
					className="fill-medium-grey group-hover:fill-red"
				/>
			</button>
		</motion.div>
	);
};
