import { useRouter } from "next/navigation";
import React from "react";

import DonutChart from "../budgets/DonutChart";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { BudgetSummary } from "../budgets/SpendingSummary";
import { calculateSpendingForBudget, toLocaleStringWithCommas } from "@/lib/helperFunctions";
import OverviewHeader from "./OverviewHeader";

const MyBudget = () => {
	const router = useRouter();
	const { budgets, transactions, currency } = useSelector((state: RootState) => state.finance);

	const budgetSummary: BudgetSummary[] = budgets.map((budget) => ({
		budget,
		spent: calculateSpendingForBudget(transactions, budget),
	}));
	const handleNavigation = () => router.push("/budgets");

	return (
		<aside className="overview-content" aria-labelledby="budgets-overview">
			<OverviewHeader
				title="Budgets"
				handleNavigation={handleNavigation}
				ariaLabel="Navigate to all budgets page"
				ariaTitle="View All Budgets"
				text="See Details"
			/>
			<section
				className="flex-column gap-4 md:grid md:grid-cols-[4fr_1fr] items-start"
				aria-labelledby="budget-summary and category-list"
			>
				<div className="flex-center w-full">
					<DonutChart data={budgetSummary} />
				</div>
				<ul
					className="grid grid-cols-2 md:grid-cols-1 gap-4 w-full items-center"
					aria-labelledby="Top 4 Budget Categories"
				>
					{budgetSummary.slice(0, 4).map(({ budget, spent }) => (
						<li
							className="flex-column gap-1 pl-4 relative"
							key={budget.id}
							aria-label={`Category: ${
								budget.category.name
							}, spent ${toLocaleStringWithCommas(spent, currency, 2)}`}
						>
							<span
								aria-hidden
								className="absolute top-0 left-0 w-1 h-full rounded-8"
								style={{ backgroundColor: budget.theme.value }}
							/>
							<p className="text-p5 text-muted capitalize">{budget.category.name}</p>
							<p className="text-p4-bold">
								{toLocaleStringWithCommas(spent, currency, 2)}
							</p>
						</li>
					))}
				</ul>
			</section>
		</aside>
	);
};

export default MyBudget;
