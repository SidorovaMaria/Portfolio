import React from "react";
import { PotType } from "@/lib/features/financeSlice";
import { AnimatePresence, motion } from "motion/react";
import { modalContentVariant, ModalOverlayVariant } from "../constants/motionVariants";
import IconCloseModal from "../svg/IconCloseModal";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toLocaleStringWithCommas } from "@/lib/helperFunctions";
import IconWarning from "../svg/IconWarning";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
interface AddWithdrawPotProps {
	pot: PotType;
	mode: "add" | "withdraw" | "";
	open: boolean;
	close: () => void;
}

const AddWithdrawPot = ({ pot, close, mode, open }: AddWithdrawPotProps) => {
	const addWithdrawSchema = Yup.object({
		amount: Yup.number()
			.transform((value, originalValue) => {
				return originalValue === "" ? undefined : value;
			})
			.required("Amount is required")
			.positive("Amount must be a positive number")
			.test("max-withdraw", "Cannot withdraw more than is available in the pot", (value) =>
				mode === "withdraw" ? value <= pot.total : true
			)
			.test("max-add", "You’re adding more than the pot target", (value) =>
				mode === "add" ? pot.total + value <= pot.target : true
			),
	}).required();

	type AddWithdrawFormData = Yup.InferType<typeof addWithdrawSchema>;

	const {
		register,
		handleSubmit,
		formState: { errors },

		watch,
	} = useForm<AddWithdrawFormData>({
		resolver: yupResolver(addWithdrawSchema),
		defaultValues: {
			amount: 0,
		},
	});
	const dispatch = useDispatch();
	const { currency } = useSelector((state: RootState) => state.finance);

	const amount = watch("amount") || 0;

	const newTotal =
		mode === "add" ? Number(pot.total) + Number(amount) : Number(pot.total) - Number(amount);
	const percentage = ((newTotal / pot.target) * 100).toFixed(2);

	const onSubmit = (data: AddWithdrawFormData) => {
		if (mode === "add") {
			dispatch({
				type: "finance/addMoneyToPot",
				payload: { potId: pot.id, amount: data.amount },
			});
		} else if (mode === "withdraw") {
			dispatch({
				type: "finance/withdrawMoneyFromPot",
				payload: { potId: pot.id, amount: data.amount },
			});
		}
		close();
	};

	return (
		<AnimatePresence>
			{open && (
				<motion.div
					initial={"initial"}
					animate={"show"}
					exit={"exit"}
					onClick={close}
					variants={ModalOverlayVariant}
					className="modal-overlay px-5"
				>
					<motion.div
						onClick={(e) => e.stopPropagation()}
						variants={modalContentVariant}
						className="modal-content w-full max-w-[560px] origin-top"
					>
						<div className="flex w-full items-center justify-between ">
							<h2 className="text-2 leading-120 font-bold">
								{mode === "add"
									? `Add to '${pot.name}'`
									: `Withdraw from '${pot.name}'`}
							</h2>
							<IconCloseModal
								className="cursor-pointer w-8 h-8 fill-grey-500 hover:fill-red-400 transition-colors duration-300"
								onClick={close}
							/>
						</div>
						<p className="text-4 w-full text-grey-500 leading-150">
							{mode == "add"
								? "Add money to your pot to keep it separate from your main balance. As soon as you add this money, it will be deducted from your current balance."
								: "Withdraw from your pot to put money back in your main balance. This will reduce the amount you have in this pot."}
						</p>
						<section className="flex flex-col items-center w-full gap-4">
							{/* New Amount */}
							<div className="flex items-center justify-between w-full mt-5">
								<p className="text-4 text-grey-500 leading-150 capitalize">
									New Amount
								</p>
								<p className="text-1 font-bold leading-120 text-grey-900">
									{toLocaleStringWithCommas(newTotal ?? 0, currency, 2)}
								</p>
							</div>
							{/* Progress Bar and Percentage */}
							<div className="flex flex-col w-full gap-3">
								<div className="relative w-full h-2 bg-gray-200 rounded-[4px] overflow-hidden">
									<motion.div
										className={`h-full rounded-[4px] absolute bg-grey-900 z-40
                                ${
									newTotal !== pot.total &&
									" rounded-r-none border-r-2 border-white"
								}`}
										initial={false}
										animate={{
											width:
												mode === "add"
													? `${(pot.total / pot.target) * 100}%`
													: `${(newTotal / pot.target) * 100}%`,
										}}
										transition={{ duration: 0.3, ease: "linear" }}
									/>

									<motion.div
										className={`h-full rounded-[4px] absolute  bg-red-400 z-30`}
										initial={false}
										animate={{
											width:
												mode !== "add"
													? `${(pot.total / pot.target) * 100}%`
													: `${(newTotal / pot.target) * 100}%`,
										}}
										transition={{ duration: 0.3, ease: "linear" }}
										style={{
											backgroundColor: mode === "add" ? "#277C78" : "##94736",
										}}
									/>
								</div>
								<div className="flex items-center justify-between w-full">
									<p
										className={`text-5 font-bold text-grey-900 ${
											mode === "add"
												? "text-secondary-green"
												: "text-secondary-red"
										}`}
									>
										{percentage}%
									</p>
								</div>
							</div>
						</section>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="flex flex-col gap-4 w-full"
						>
							<div className="flex flex-col gap-1 w-full">
								<div className="flex w-full items-center justify-between">
									<label
										htmlFor="potName"
										className="text-5 font-bold leading-150 text-grey-500"
									>
										Amount to {mode === "add" ? "Add" : "Withdraw"}
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
							<button
								type="submit"
								className="btn btn-primary w-full text-4 font-bold leading-150"
							>
								{mode === "add" ? "Confirm Addition" : "Confirm Withdrawal"}
							</button>
						</form>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default AddWithdrawPot;
