import React, { useEffect } from "react";
import { PotType } from "@/lib/features/financeSlice";
import { motion } from "motion/react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toLocaleStringWithCommas } from "@/lib/helperFunctions";
import IconWarning from "../svg/IconWarning";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Modal from "../Modal";
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
		reset,
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
		reset();
	};
	useEffect(() => {
		reset();
	}, [mode, pot.id, reset]);

	return (
		<Modal
			close={close}
			open={open}
			title={mode === "add" ? `Add to '${pot.name}'` : `Withdraw from '${pot.name}'`}
		>
			<p className="text-p4 w-full text-muted">
				{mode == "add"
					? "Add money to your pot to keep it separate from your main balance. As soon as you add this money, it will be deducted from your current balance."
					: "Withdraw from your pot to put money back in your main balance. This will reduce the amount you have in this pot."}
			</p>
			<section className="flex-column  gap-4">
				{/* New Amount */}
				<div className="flex-between mt-5">
					<p className="text-p4 text-muted capitalize">New Amount</p>
					<p className="text-h1">
						{toLocaleStringWithCommas(newTotal ?? 0, currency, 2)}
					</p>
				</div>
				{/* Progress Bar and Percentage */}
				<div className="flex-column gap-3">
					<div className="relative w-full h-2 bg-surface-alt rounded-[4px] overflow-hidden">
						<motion.div
							className={`h-full rounded-[4px] absolute bg-fg z-40
                                ${
									newTotal !== pot.total && " rounded-r-none border-r-2 border-bg"
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
					<div className="flex-between">
						<p
							className={`text-p5-bold  ${
								mode === "add" ? "text-accent" : "text-danger"
							}`}
						>
							{percentage}%
						</p>
					</div>
				</div>
			</section>
			<form onSubmit={handleSubmit(onSubmit)} className=" flex-column gap-4 ">
				<div className=" flex-column gap-1 ">
					<div className="flex-between">
						<label htmlFor="Amount Add/Widraw" className="text-p5-bold  text-muted">
							Amount to {mode === "add" ? "Add" : "Withdraw"}
						</label>
						{errors?.amount && (
							<p className="error-message ">
								<IconWarning
									className="
                                    inline-flex  fill-red-500 "
								/>
								{errors.amount.message}
							</p>
						)}
					</div>
					<div className="input-container relative">
						<span className="text-border dark:text-muted-alt">{currency}</span>
						<input
							type="number"
							id="Amount Add/Widraw"
							className="outline-none flex-1 w-full"
							{...register("amount")}
						/>
					</div>
				</div>
				<button type="submit" className="btn btn-primary w-full text-p4-bold">
					{mode === "add" ? "Confirm Addition" : "Confirm Withdrawal"}
				</button>
			</form>
		</Modal>
	);
};

export default AddWithdrawPot;
