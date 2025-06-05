import { TransactionType } from "@/lib/features/financeSlice";

import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import IconWarning from "../svg/IconWarning";
import { RootState } from "@/lib/store";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { iconMap } from "../constants";
import Modal from "../Modal";
import ModalDropDown from "./ModalDropDown";

interface AddTransactionProps {
	mode: string;
	open: boolean;
	close: () => void;
	transaction?: TransactionType | null;
}

const transactionSchema = Yup.object({
	title: Yup.string()
		.required("Title is required.")
		.max(30, "Title cannot exceed 30 characters."),
	category: Yup.object({
		name: Yup.string().required(),
		icon: Yup.mixed<keyof typeof iconMap | "">().required(),
	}),
	date: Yup.string().required("Date is required."),
	amount: Yup.number()
		.typeError("Amount must be a number.")
		.positive("Amount must be a positive number.")
		.min(0.01, "Amount must be at least 0.01.")
		.required("Amount is required."),
	type: Yup.string()
		.oneOf(["income", "expense"], "Please select a valid transaction type")
		.required("Transaction type is required."),
	reccuring: Yup.boolean().default(false),
});
type TransactionFormData = Yup.InferType<typeof transactionSchema>;

const AddTransaction = ({ mode, open, close, transaction }: AddTransactionProps) => {
	const { categories, currency } = useSelector((state: RootState) => state.finance);
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
		setValue,
	} = useForm<TransactionFormData>({
		resolver: yupResolver(transactionSchema),
		defaultValues: {
			title: "",
			category: { name: "Select Category", icon: "" },
			date: new Date().toISOString().split("T")[0],
			amount: 0,
			type: "expense",
			reccuring: false,
		},
	});
	useEffect(() => {
		if (mode === "edit" && transaction) {
			reset({
				title: transaction.title,
				category: transaction.category,
				date: new Date(transaction.date).toISOString().split("T")[0],
				amount: transaction.amount,
				type: transaction.type,
				reccuring: transaction.reccuring,
			});
		} else {
			reset();
		}
	}, [mode, transaction, reset, open]);

	const onSubmit = (data: TransactionFormData) => {
		const formattedData = {
			...data,
			category:
				data.category.name === "Select Category"
					? { name: "Other", icon: "" }
					: data.category,
		};
		const actionType = mode === "edit" ? "finance/editTransaction" : "finance/addTransaction";
		const payload =
			mode === "edit"
				? { ...formattedData, id: transaction?.id, date: new Date(data.date).toISOString() }
				: formattedData;
		dispatch({ type: actionType, payload });
		close();
	};

	const handleDelete = () => {
		if (transaction?.id) {
			dispatch({ type: "finance/deleteTransaction", payload: transaction.id });
			close();
		}
	};

	return (
		<Modal
			close={close}
			open={open}
			title={mode === "add" ? `Add New Transaction` : `Edit '${transaction?.title}'`}
		>
			<form
				id="add-transaction-form"
				className="flex-column gap-4 "
				onSubmit={handleSubmit(onSubmit)}
			>
				{/* Type Selector */}
				<div className="w-full flex-between gap-4 ">
					{["expense", "income"].map((type) => (
						<label htmlFor={type} className="w-full" key={type}>
							<input
								type="radio"
								id={type}
								value={type}
								{...register("type")}
								className="hidden"
							/>
							<span
								className={`btn btn-primary text-p4-bold w-full capitalize
                                    ${
										type === "income" &&
										watch("type") !== "income" &&
										"hover:bg-accent/40 hover:text-accent "
									}
                                    ${
										type === "expense" &&
										watch("type") !== "expense" &&
										"hover:bg-danger/40 hover:text-danger "
									}
                                    ${
										watch("type") === type
											? type === "income"
												? "bg-accent! text-white "
												: "bg-danger! text-white "
											: `bg-surface text-fg `
									}`}
							>
								{type}
							</span>
						</label>
					))}
				</div>
				{/* Title */}
				<div className="flex-column gap-1 ">
					<label className="flex-between" htmlFor="title">
						<span className="text-p5-bold text-muted">Title</span>
						{errors?.title && (
							<span className="error-message">
								<IconWarning
									className="
                                    inline-flex fill-red-500 "
								/>

								{errors.title.message}
							</span>
						)}
					</label>
					<div
						className={`input-container flex-1 ${
							errors?.title ? "border-red-500!" : ""
						}`}
					>
						<input
							type="text"
							id="title"
							className="outline-none w-full "
							placeholder="e.g. Grocery Shopping"
							{...register("title")}
						/>
					</div>
					<p className="text-p5 text-muted text-right">
						{30 - (watch("title")?.length || 0)} characters left
					</p>
				</div>
				{/* Amount & Date */}
				<div className="flex-center-full gap-4">
					{/* Amount */}
					<div className="flex-column gap-1">
						<label htmlFor="amount" className="flex-between">
							<span className="text-p5-bold text-muted">Amount</span>
							{errors?.amount && (
								<span className="error-message ">
									<IconWarning
										className="
                                    inline-flex  fill-red-500 "
									/>

									{errors.amount.message}
								</span>
							)}
						</label>
						<div className="input-container">
							<span className=" text-muted-alt">{currency}</span>
							<input
								type="number"
								step="0.01"
								id="amount"
								className="outline-none flex-1 w-full"
								{...register("amount", { valueAsNumber: true })}
							/>
						</div>
					</div>
					{/* Date */}
					<div className="flex flex-col gap-1 w-1/3">
						<label htmlFor="date" className="text-p5-bold text-muted">
							Date
						</label>
						<div className="input-container ">
							<input
								type="date"
								id="date"
								className="outline-none flex-1 w-full"
								{...register("date")}
							/>
						</div>
					</div>
				</div>
				{/* Recurring Checkbox */}
				<div className="flex items-center gap-2">
					<label htmlFor="reccuring" className="text-p5-bold text-muted">
						Recurring Transaction?
					</label>
					<input
						type="checkbox"
						id="reccuring"
						{...register("reccuring")}
						className="w-4 h-4"
					/>
				</div>
				{/* Category Selector */}
				<ModalDropDown
					error={errors.category?.message}
					optionType="categories"
					label="Transaction Category"
					options={categories}
					selected={watch("category")}
					setSelected={(category) =>
						setValue(
							"category",
							category as {
								name: string;
								icon: keyof typeof iconMap;
							}
						)
					}
				/>
			</form>
			{/* Submit/ Delete Button */}
			<div className="flex items-center w-full gap-4">
				<button
					type="submit"
					form="add-transaction-form"
					className="btn btn-primary w-full py-4"
				>
					{mode === "add" ? "Add Transaction" : "Update"}
				</button>
				{mode === "edit" && (
					<button
						type="button"
						className="btn btn-destroy text-white w-1/2  "
						onClick={handleDelete}
					>
						Delete
					</button>
				)}
			</div>
		</Modal>
	);
};

export default AddTransaction;
