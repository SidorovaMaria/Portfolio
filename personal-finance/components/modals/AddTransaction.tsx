import { AnimatePresence, motion } from "motion/react";
import { modalContentVariant, ModalOverlayVariant } from "../constants/motionVariants";
import { TransactionType } from "@/lib/features/financeSlice";
import IconCloseModal from "../svg/IconCloseModal";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import IconWarning from "../svg/IconWarning";
import { RootState } from "@/lib/store";
import IconCaretLeft from "../svg/IconCaretLeft";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CategoriesType, iconMap } from "../constants";

interface AddTransactionProps {
	mode: string;
	open: boolean;
	close: () => void;
	transaction?: TransactionType | null;
}

const AddTransaction = ({ mode, open, close, transaction }: AddTransactionProps) => {
	const { categories, currency } = useSelector((state: RootState) => state.finance);
	const dispath = useDispatch();
	const [categoriesToggle, setCategoriesToggle] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState(
		mode === "edit" ? transaction?.category : null
	);
	const toggleCategories = () => {
		setCategoriesToggle((prev) => !prev);
	};
	const transactionSchema = Yup.object({
		title: Yup.string()
			.required("Please enter a title for the transaction")
			.max(30, "Title must not exceed 50 characters"),
		category: Yup.object({
			name: Yup.string().required("Please select a category"),
			icon: Yup.mixed().required("Please select a category icon"),
		}),
		date: Yup.date().required("Please select a date"),
		amount: Yup.number().required("Please enter an amount").positive("Enter amount"),
		type: Yup.string()
			.oneOf(["income", "expense"], "Please select a valid transaction type")
			.required("Please select a transaction type"),
		reccuring: Yup.boolean().default(false),
	});
	type TransactionFormData = Yup.InferType<typeof transactionSchema>;
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
			title: mode === "edit" ? transaction?.title : "",
			category: mode === "edit" ? transaction?.category : { name: "", icon: {} },
			date: mode === "edit" ? transaction?.date : new Date(),
			amount: mode === "edit" ? transaction?.amount : 0,
			type: mode === "edit" ? transaction?.type : "expense",
			reccuring: mode === "edit" ? transaction?.reccuring : false,
		},
	});
	const handleSubmitTransaction = (data: TransactionFormData) => {
		if (mode === "add") {
			console.log("Adding new transaction:", data);
			dispath({
				type: "finance/addTransaction",
				payload: {
					...data,
					date: data.date.toISOString(),
				},
			});
		}
		close();
	};

	useEffect(() => {
		if (mode === "edit" && transaction) {
			setSelectedCategory(transaction.category);
			reset({
				title: transaction.title,
				category: transaction.category,
				date: transaction.date,
				amount: transaction.amount,
				type: transaction.type,
				reccuring: transaction.reccuring,
			});
		} else {
			setSelectedCategory(null);
			reset();
		}
	}, [mode, transaction, reset]);

	return (
		<AnimatePresence mode="wait">
			{open && (
				<motion.div
					initial={"initial"}
					animate={"show"}
					exit={"exit"}
					onClick={close}
					variants={ModalOverlayVariant}
					className="modal-overlay px-5 z-50"
				>
					<motion.div
						onClick={(e) => e.stopPropagation()}
						variants={modalContentVariant}
						className="modal-content w-full max-w-[560px] origin-top "
					>
						<div className="flex w-full items-center justify-between ">
							<h2 className="text-2 leading-120 font-bold capitalize">
								{mode === "add"
									? `Add new transaction`
									: `Edit transaction '${transaction?.title}'`}
							</h2>
							<IconCloseModal
								className="cursor-pointer w-8 h-8 fill-grey-500 hover:fill-red-400 transition-colors duration-300"
								onClick={close}
							/>
						</div>
						<form
							id="add-transaction-form"
							className="flex flex-col gap-4 w-full"
							onSubmit={handleSubmit(handleSubmitTransaction)}
						>
							<div className="w-full flex items-center justify-between gap-4 ">
								<label htmlFor="expense" className="w-full">
									<input
										type="radio"
										value="expense"
										id="expense"
										{...register("type")}
										className="hidden"
									/>
									<span
										className={`btn btn-primary inline-flex w-full text-center text-4 font-bold leading-150 bg-grey-100 text-gray-900 ${
											watch("type") === "expense"
												? "bg-secondary-red text-white"
												: " hover:bg-secondary-red/20 hover:text-secondary-red"
										}`}
									>
										Expense
									</span>
								</label>
								<label htmlFor="income" className="w-full">
									<input
										type="radio"
										value="income"
										id="income"
										{...register("type")}
										className="hidden"
									/>
									<span
										className={`btn btn-primary inline-flex w-full text-center text-4 font-bold leading-150 bg-grey-100 text-gray-900  ${
											watch("type") === "income"
												? "bg-secondary-green text-white"
												: " hover:bg-secondary-green/20 hover:text-secondary-green"
										}`}
									>
										Income
									</span>
								</label>
							</div>

							<div className="flex flex-col gap-1 w-full">
								<div className="flex w-full items-cenger justify-between">
									<label
										htmlFor="title"
										className="text-5 font-bold leading-150 text-grey-500"
									>
										Title
									</label>
									{errors?.title && (
										<p className="text-5  text-red-500 font-bold leading-150 flex items-center gap-1">
											<IconWarning
												className="
                                    inline-flex  fill-red-500 "
											/>

											{errors.title.message}
										</p>
									)}
								</div>
								<div
									className={`px-5 text-4 leading-150 py-3 rounded-8 bg-white border border-beige-500 flex-1 ${
										errors?.title ? "border-red-500!" : ""
									}`}
								>
									<input
										type="text"
										id="title"
										className="outline-none w-full "
										placeholder="e.g. Weekly Grocery Shopping"
										{...register("title")}
									/>
								</div>

								<p className="text-5 leading-150 text-grey-500 text-right">
									{30 - (watch("title")?.length || 0)} characters left
								</p>
							</div>
							{/* Amount & Date */}
							<div className="flex items-center w-full gap-4">
								{/* Amount */}
								<div className="flex flex-col gap-1 w-full">
									<div className="flex w-full items-center justify-between">
										<label
											htmlFor="amount"
											className="text-5 font-bold leading-150 text-grey-500"
										>
											Amount
										</label>
										{errors?.amount && (
											<p className="text-5  text-red-500 font-bold leading-150 flex items-center gap-1">
												<IconWarning
													className="
                                    inline-flex  fill-red-500 "
												/>

												{errors.amount.message}
											</p>
										)}
									</div>
									<div className="px-5 text-4 leading-150 py-3 rounded-8 bg-white border border-beige-500 has-focus-within:border-grey-900  flex items-center gap-3 relative">
										<span className=" text-grey-500">{currency}</span>
										<input
											type="number"
											id="potTarget"
											className="outline-none flex-1 w-full"
											{...register("amount")}
										/>
									</div>
								</div>
								{/* Amount */}
								<div className="flex flex-col gap-1 w-1/3">
									<label
										htmlFor="amount"
										className="text-5 font-bold leading-150 text-grey-500"
									>
										Date
									</label>
									<div className="px-5 text-4 leading-150 py-3 rounded-8 bg-white border border-beige-500 has-focus-within:border-grey-900  flex items-center gap-3 relative">
										<input
											type="date"
											id="date"
											defaultValue={
												mode === "edit"
													? transaction?.date?.toISOString().split("T")[0]
													: undefined
											}
											className="outline-none flex-1 w-full"
											{...register("date")}
										/>
									</div>
								</div>
							</div>
							<div className="flex items-center gap-2">
								<label
									htmlFor="reccuring"
									className="text-5 font-bold leading-150 text-grey-500"
								>
									Recurring Transaction?
								</label>
								<input
									type="checkbox"
									id="reccuring"
									{...register("reccuring")}
									className="w-4 h-4"
								/>
							</div>
							<div className="px-5 text-4 leading-150 py-3 rounded-8 bg-white border border-beige-500 has-focus-within:border-grey-900 relative">
								<div className="flex items-center gap-3 w-full">
									{selectedCategory?.icon &&
										(() => {
											const Icon = iconMap[selectedCategory.icon];
											return Icon ? <Icon /> : null;
										})()}
									<p className="text-grey-900 flex-1">
										{selectedCategory?.name || "Select Category"}
									</p>
									<button
										type="button"
										className="w-4 h-4"
										onClick={toggleCategories}
									>
										<IconCaretLeft className=" -rotate-90 fill-grey-900 w-3 h-3 cursor-pointer" />
									</button>
								</div>
								<AnimatePresence>
									{categoriesToggle && (
										<motion.aside
											initial={{ opacity: 0, scaleY: 0, y: -100 }}
											animate={{ opacity: 1, scaleY: 1, y: 0 }}
											exit={{ opacity: 0, scaleY: 0, y: -100 }}
											transition={{
												duration: 0.3,
												type: "spring",
												stiffness: 100,
											}}
											className="absolute  top-full w-full left-0 max-h-[150px] overflow-auto bg-white flex flex-col mt-1 shadow-[0px_4px_24px_rgba(0,0,0,0,0.25)] rounded-8 transition-colors duration-300"
										>
											{categories.map((category: CategoriesType) => {
												const Icon = iconMap[category.icon];
												return (
													<div
														key={category.name}
														className={`flex items-center text-4 font-medium gap-3 w-full cursor-pointer  px-5 py-2 rounded-8 mx-1
                                                        ${
															category === selectedCategory
																? watch("type") === "expense"
																	? "bg-gradient-to-l from-white to-secondary-red text-white!"
																	: "bg-gradient-to-l from-white to-secondary-green text-white!"
																: watch("type") === "expense"
																? "hover:bg-secondary-red/20 hover:text-secondary-red"
																: "hover:bg-secondary-green/20 hover:text-secondary-green"
														}`}
														onClick={() => {
															setSelectedCategory(category);
															setCategoriesToggle(false);
															setValue("category", {
																name: category.name,
																icon: category.icon,
															});
														}}
													>
														<Icon />
														<p
															className={` flex-1 ${
																category === selectedCategory
																	? "font-semibold "
																	: ""
															}`}
														>
															{category.name}
														</p>
													</div>
												);
											})}
										</motion.aside>
									)}
								</AnimatePresence>
							</div>
						</form>
						<button
							type="submit"
							form="add-transaction-form"
							className="btn btn-primary w-full py-4"
						>
							{mode === "add" ? "Add Transaction" : "Update Transaction"}
						</button>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default AddTransaction;
