import { calculateSpendingForBudget, toLocaleStringWithCommas } from "@/lib/helperFunctions";
import { RootState } from "@/lib/store";
import React from "react";
import { useSelector } from "react-redux";
import DonutChart from "./DonutChart";
import { BudgetType } from "@/lib/features/financeSlice";
export type BudgetSummary = {
	budget: BudgetType;
	spent: number;
};
const SpendingSummary = () => {
	const { budgets, currency, transactions } = useSelector((state: RootState) => state.finance);
	// Calculate total spending and budgeted amounts

	const budgetSummary: BudgetSummary[] = budgets.map((budget) => {
		const spending = calculateSpendingForBudget(transactions, budget);
		return {
			budget: budget,
			spent: spending,
		};
	});
	const totalBudgetSpend = budgetSummary.reduce((acc, curr) => acc + curr.spent, 0);
	const totalBudgeted = budgets.reduce((acc, curr) => acc + curr.maximum, 0);
	return (
		<div className="flex flex-col gap-8 w-full px-5 py-6">
			{/* Circle */}
			<div className="flex items-center justify-center w-full">
				<DonutChart
					data={budgetSummary}
					totalBudget={totalBudgeted}
					totalSpend={totalBudgetSpend}
				/>
			</div>
			{/* Summary */}
			<div className=" flex flex-col gap-6 w-full">
				<h4 className="text-2 leading-120 font-bold">Spending Summary</h4>
				{budgetSummary.length > 0 ? (
					<div className="flex flex-col gap-4 w-full">
						{budgetSummary.map((summary) => (
							<div
								className="flex items-center justify-between w-full relative pl-4"
								key={summary.budget.id}
							>
								<span
									className="absolute left-0 top-0 w-[4px] h-full rounded-8 "
									style={{ backgroundColor: summary.budget.theme.value }}
								/>
								<p className="text-4 leading-150 text-grey-500 capitalize">
									{summary.budget.category.name}{" "}
								</p>
								<p className="text-3 leaing-120 font-bold  align-middle">
									{toLocaleStringWithCommas(summary.spent, currency, 2)}{" "}
									<span className="text-5 font-normal leading-150 text-grey-500 inline-flex align-middle">
										of{" "}
										{toLocaleStringWithCommas(
											summary.budget.maximum,
											currency,
											2
										)}
									</span>
								</p>
							</div>
						))}
					</div>
				) : null}
			</div>
		</div>
	);
};

export default SpendingSummary;
