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
		<article className="flex-column gap-8 px-5 py-6 rounded-12 bg-bg ">
			<div className="flex-between">
				<h3 className="text-h2 text-fg flex items-center gap-4 flex-1">
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
			<div className="flex-column gap-4 ">
				<div className="flex items-center justify-between w-full">
					<p className="text-p4 text-muted capitalize">total saved</p>
					<p className="text-h1">{toLocaleStringWithCommas(pot.total, currency, 2)}</p>
				</div>
				{/* Progress Bar */}
				<div className="flex-column gap-3">
					<div className="relative w-full h-2 bg-surface-alt rounded-[4px] overflow-hidden">
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
					<div className="flex-between">
						<p className="text-p5-bold text-muted">
							{((pot.total / pot.target) * 100).toFixed(2)}%
						</p>
						<p className="text-p5 text-muted">
							Target of {toLocaleStringWithCommas(pot.target, currency, 0)}
						</p>
					</div>
				</div>
			</div>
			<div className="flex-center gap-4">
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
				item={pot}
			/>
		</article>
	);
};

export default Pot;
