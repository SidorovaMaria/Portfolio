import { useRouter } from "next/navigation";
import React from "react";
import IconCaretLeft from "../svg/IconCaretLeft";
import DonutChart from "../budgets/DonutChart";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { BudgetSummary } from "../budgets/SpendingSummary";
import { calculateSpendingForBudget, toLocaleStringWithCommas } from "@/lib/helperFunctions";

const MyBudget = () => {
	const router = useRouter();
	const { budgets, transactions, currency } = useSelector((state: RootState) => state.finance);
	const budgetSummary: BudgetSummary[] = budgets.map((budget) => {
		const spending = calculateSpendingForBudget(transactions, budget);
		return {
			budget: budget,
			spent: spending,
		};
	});

	return (
		<aside className="overview-content">
			<div className="flex w-full items-center justify-between">
				<h2 className="text-2 font-bold leading-120">Budgets</h2>
				<button
					className="btn btn-tertiary group duration-300 transition-all"
					onClick={() => router.push("/budgets")}
				>
					See Details
					<span className="ml-3 inline-flex">
						<IconCaretLeft className=" duration-300 transition-all fill-grey-300 rotate-180 group-hover:fill-grey-900" />
					</span>
				</button>
			</div>
			<div className="flex flex-col items-center w-full gap-4 md:grid md:grid-cols-[2fr_1fr]">
				<div className="flex items-center justify-center w-full">
					<DonutChart data={budgetSummary} />
				</div>
				<div className="grid grid-cols-2 md:grid-cols-auto gap-4 w-full items-center">
					{budgetSummary.slice(0, 8).map((summary) => (
						<div
							className="flex flex-col gap-1 w-full pl-4 relative"
							key={summary.budget.id}
						>
							<span
								className="h-full w-1 absolute top-0 left-0 rounded-8"
								style={{ backgroundColor: summary.budget.theme.value }}
							/>

							<p className="text-5 text-grey-500 leading-150 capitalize">
								{summary.budget.category.name}
							</p>
							<p className="text-4 font-bold leading-150">
								{toLocaleStringWithCommas(summary.spent, currency, 2)}{" "}
							</p>
						</div>
					))}
				</div>
			</div>
		</aside>
	);
};

export default MyBudget;
