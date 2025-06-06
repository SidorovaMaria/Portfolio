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
		<div className="flex-column gap-5 rounded-12 px-5 py-6 md:p-8 bg-bg ">
			<div className="flex-between">
				<span
					className="size-4 rounded-full mr-4"
					style={{
						backgroundColor: budget.theme.value,
					}}
				></span>
				<h3 className="text-h2 w-full flex-1">
					{budget.category.name}
					{isOverBudget && (
						<span className="text-red-500/80 ml-2 text-p4-bold inline-flex items-center gap-1">
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
			<div className="flex-column gap-4 ">
				<p className="text-p4 text-muted">
					Maximum of {toLocaleStringWithCommas(budget.maximum, currency, 2)}
				</p>
				{/* Porgress Bar */}
				<div className="flex-column gap-3 ">
					<div
						className={`relative w-full h-6 p-1 rounded-[4px] overflow-hidden
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
					className="flex-between gap-4  border-l-4 px-4"
					style={{
						borderColor: budget.theme.value,
					}}
				>
					<div className="flex-column gap-1 ">
						<p className="text-p5 text-muted">Spent</p>
						<p className="text-p4-bold">
							{toLocaleStringWithCommas(spend, currency, 2)}
						</p>
					</div>
					<div className="flex flex-col gap-1 w-full">
						<p className="text-p5 text-muted">Remaining</p>
						<p className="text-p4-bold">
							{toLocaleStringWithCommas(budget.maximum - spend, currency, 2)}
						</p>
					</div>
				</div>
				{/* Latest Spending */}

				{latest.length > 0 && (
					<>
						<aside className="flex-column gap-5 rounded-12 bg-surface p-4 md:p-5">
							<div className="fle-column">
								<div className="flex-between">
									<h1 className="text-h3">Latest Spending</h1>
									<Link
										href={{
											pathname: "/transactions",
											query: { category: budget.category.name },
										}}
										className="text-p4 text-muted cursor-pointer group hover:text-fg transition-colors "
									>
										See All
										<span className="inline-flex ml-3">
											<IconCaretLeft className="-rotate-180 size-3 fill-muted group-hover:fill-fg transition-colors" />
										</span>
									</Link>
								</div>
								{latest.map((transaction) => (
									<div
										key={transaction.id}
										className="flex-between gap-4 pb-3 border-b border-muted/15 last:border-b-0 pt-3 first:pt-0"
									>
										<p className="text-p5-bold">{transaction.title} </p>
										<div className="flex flex-col gap-1 items-end">
											<p className="text-p5-bold">
												-
												{toLocaleStringWithCommas(
													transaction.amount,
													currency,
													2
												)}
											</p>
											<p className="text-p5 text-muted">
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
								))}
							</div>
						</aside>
					</>
				)}
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
