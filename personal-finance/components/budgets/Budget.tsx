"use client";
import { BudgetType } from "@/lib/features/financeSlice";
import React, { useState } from "react";
import OptionBtn from "../OptionBtn";
import {
	calculateSpendingForBudget,
	getLatestTransactionsByCategory,
	toLocaleStringWithCommas,
} from "@/lib/helperFunctions";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { motion } from "motion/react";
import Link from "next/link";
import IconCaretLeft from "../svg/IconCaretLeft";
import IconWarning from "../svg/IconWarning";
import DeleteModal from "../modals/DeleteModal";
interface BudgetProps {
	budget: BudgetType;
	editBudget: (budget: BudgetType) => void;
}

const Budget = ({ budget, editBudget }: BudgetProps) => {
	const { transactions, currency } = useSelector((state: RootState) => state.finance);
	const spend = calculateSpendingForBudget(transactions, budget);
	const latest = getLatestTransactionsByCategory(transactions, budget.category, 3);
	const isOverBudget = spend > budget.maximum;
	const [deleteModalState, setdeleteModalState] = useState({
		isOpen: false,
	});
	return (
		<div className="flex flex-col gap-5 rounded-12 px-5 py-6 bg-white w-full">
			<div className="flex items-center justify-between w-full">
				<span
					className="w-4 h-4 rounded-full mr-4"
					style={{
						backgroundColor: budget.theme.value,
					}}
				></span>
				<h3 className="text-2 leading-120 font-bold w-full flex-1">
					{budget.category.name}
					{isOverBudget && (
						<span className="text-red-500 ml-2 text-4 font-bold inline-flex items-center gap-1">
							<IconWarning className="fill-red-500" /> Over Budget
						</span>
					)}
				</h3>
				<OptionBtn
					options={[
						{
							label: "Edit Budget",
							option: () => editBudget(budget),
						},
						{
							label: "Delete Budget",
							option: () => setdeleteModalState({ isOpen: true }),
						},
					]}
				/>
			</div>
			<div className="flex flex-col gap-4 w-full">
				<p className="text-4 leading-150 text-grey-500">
					Maximum of {toLocaleStringWithCommas(budget.maximum, currency, 2)}
				</p>
				{/* Porgress Bar */}
				<div className="flex flex-col gap-3 w-full">
					<div
						className={`relative w-full h-6 p-1  rounded-[4px] overflow-hidden
                            ${isOverBudget ? "border-2 border-red-500" : ""}`}
					>
						<motion.div
							className="h-full rounded-[4px]"
							initial={false}
							animate={{
								// If the budget is over, set width to 100%
								width: isOverBudget ? "100%" : `${(spend / budget.maximum) * 100}%`,
							}}
							transition={{ duration: 1, ease: "easeInOut" }}
							style={{ backgroundColor: budget.theme.value }}
						/>
					</div>
				</div>
				<div
					className="flex items-center gap-4 w-full justify-between border-l-4 px-4"
					style={{
						borderColor: budget.theme.value,
					}}
				>
					<div className="flex flex-col gap-1 w-full">
						<p className="text-5 text-grey-500 leading-150">Spent</p>
						<p className="text-4 font-bold leading-150">
							{toLocaleStringWithCommas(spend, currency, 2)}
						</p>
					</div>
					<div className="flex flex-col gap-1 w-full">
						<p className="text-5 text-grey-500 leading-150">Remaining</p>
						<p className="text-4 font-bold leading-150">
							{toLocaleStringWithCommas(budget.maximum - spend, currency, 2)}
						</p>
					</div>
				</div>
				{/* Latest Spending */}
				<aside className="flex flex-col gap-5 w-full rounded-12 bg-beige-100 p-4">
					<div className="flex items-center justify-between w-full">
						<h1 className="text-3 font-bold leading-120">Latest Spending</h1>
						<Link
							href={{
								pathname: "/transactions",
								query: { category: budget.category.name },
							}}
							className="text-4 text-grey-500 cursor-pointer group hover:text-grey-900 transition-colors "
						>
							See All
							<span className="inline-flex ml-3">
								<IconCaretLeft className="-rotate-180 w-3 h-3 fill-grey-500 group-hover:fill-grey-900 transition-colors" />
							</span>
						</Link>
					</div>
					<div className="flex flex-col w-full">
						{latest.length > 0
							? latest.map((transaction) => (
									<div
										key={transaction.id}
										className="flex items-center justify-between w-full gap-4 pb-3 border-b border-beige-500/30 last:border-b-0 pt-3 first:pt-0"
									>
										<p className="text-5 font-bold leading-150">
											{transaction.title}{" "}
										</p>
										<div className="flex flex-col gap-1 items-end">
											<p className="text-5 font-bold leading-150">
												-
												{toLocaleStringWithCommas(
													transaction.amount,
													currency,
													2
												)}
											</p>
											<p className="text-5 leading-150 text-grey-500">
												{new Date(transaction.date).toLocaleDateString(
													"en-US",
													{
														year: "numeric",
														month: "short",
														day: "numeric",
													}
												)}
											</p>
										</div>
									</div>
							  ))
							: null}
					</div>
				</aside>
			</div>
			<DeleteModal
				open={deleteModalState.isOpen}
				key={"delete-pot-modal"}
				mode="budget"
				close={() => setdeleteModalState((prev) => ({ ...prev, isOpen: false }))}
				item={budget}
			/>
		</div>
	);
};

export default Budget;
