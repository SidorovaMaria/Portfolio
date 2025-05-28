import React, { useState } from "react";

import { PotType } from "../lib/features/financeSlice";

import { toLocaleStringWithCommas } from "@/lib/helperFunctions";
import { RootState } from "../lib/store";
import { useSelector } from "react-redux";
import { motion } from "motion/react";
import AddWithdrawPot from "./modals/AddWithdrawPot";
import OptionBtn from "./OptionBtn";
import DeleteModal from "./modals/DeleteModal";
interface PotProps {
	pot: PotType;
	open: (pot: PotType) => void;
}
const Pot = ({ pot, open }: PotProps) => {
	const { currency } = useSelector((state: RootState) => state.finance);
	const [deleteModalOpen, setDeleteModalOpen] = useState({
		mode: "pot",

		open: false,
	});

	const [addWithdrawPot, setAddWithdrawPot] = useState<{
		mode: "add" | "withdraw" | "";
		open: boolean;
	}>({
		mode: "add",
		open: false,
	});

	return (
		<article className="flex flex-col w-full gap-8 px-5 py-6 rounded-12 bg-white ">
			<div className="flex items-center justify-between w-full">
				<h3 className="text-2 font-bold leading-120 text-grey-900 flex items-center gap-4 flex-1">
					<span
						className="size-4 inline-flex rounded-full"
						style={{ backgroundColor: pot.theme.value }}
					/>
					{pot.name}
				</h3>
				<OptionBtn
					options={[
						{
							label: "Edit Pot",
							option: () => open(pot),
						},
						{
							label: "Delete Pot",
							option: () => setDeleteModalOpen({ mode: "pot", open: true }),
						},
					]}
				/>
			</div>
			<div className="flex flex-col items-center gap-4 w-full">
				<div className="flex items-center justify-between w-full">
					<p className="text-4 leading-150 text-grey-500 capitalize">total saved</p>
					<p className="text-1 font-bold leading-150 text-grey-900">
						{toLocaleStringWithCommas(pot.total, currency, 2)}
					</p>
				</div>
				{/* Progress Bar */}
				<div className="flex flex-col gap-3 w-full">
					<div className="relative w-full h-2 bg-gray-200 rounded-[4px] overflow-hidden">
						<motion.div
							className="h-full rounded-[4px]"
							initial={false}
							animate={{
								width: `${(pot.total / pot.target) * 100}%`,
							}}
							transition={{ duration: 1, ease: "easeInOut" }}
							style={{ backgroundColor: pot.theme.value }}
						/>
					</div>
					<div className="flex items-center justify-between w-full">
						<p className="text-5 font-bold leading-150 text-grey-500">
							{((pot.total / pot.target) * 100).toFixed(2)}%
						</p>
						<p className="text-5 leading-150 text-grey-500">
							Target of {toLocaleStringWithCommas(pot.target, currency, 0)}
						</p>
					</div>
				</div>
			</div>
			<div className="flex w-full gap-4 items-center">
				<button
					className="btn btn-secondary w-full p-4"
					onClick={() => {
						setAddWithdrawPot((prev) => {
							return {
								...prev,
								mode: "add",
								open: true,
							};
						});
					}}
				>
					+Add Money
				</button>
				<button
					className="btn btn-secondary w-full p-4"
					onClick={() => {
						setAddWithdrawPot((prev) => {
							return {
								...prev,
								mode: "withdraw",
								open: true,
							};
						});
					}}
				>
					Withdraw
				</button>
			</div>

			<AddWithdrawPot
				open={addWithdrawPot.open}
				key={`add-withdraw-pot-${addWithdrawPot.mode}`}
				mode={addWithdrawPot.mode}
				pot={pot}
				close={() => setAddWithdrawPot((prev) => ({ ...prev, open: false }))}
			/>

			<DeleteModal
				open={deleteModalOpen.open}
				key={"delete-pot-modal"}
				mode={deleteModalOpen.mode}
				close={() => setDeleteModalOpen((prev) => ({ ...prev, open: false }))}
				pot={pot}
			/>
		</article>
	);
};

export default Pot;
