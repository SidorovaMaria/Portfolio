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

	return (
		<div className="flex-column gap-8 px-5 py-6 md:flex-row md:items-center lg:flex-col">
			{/* Circle */}
			<div className="flex-center w-full">
				<DonutChart data={budgetSummary} />
			</div>
			{/* Summary */}
			<div className="flex-column gap-6">
				<h4 className="text-h2 ">Spending Summary</h4>
				{budgetSummary.length > 0 ? (
					<div className="flex-column gap-4 ">
						{budgetSummary.map((summary) => (
							<div className="flex-between relative pl-4" key={summary.budget.id}>
								<span
									className="absolute left-0 top-0 w-[4px] h-full rounded-8 "
									style={{ backgroundColor: summary.budget.theme.value }}
								/>
								<p className="text-p4 text-muted  capitalize">
									{summary.budget.category.name}{" "}
								</p>
								<p className="text-h3  align-middle">
									{toLocaleStringWithCommas(summary.spent, currency, 2)}{" "}
									<span className="text-p5 text-muted inline-flex align-middle">
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
