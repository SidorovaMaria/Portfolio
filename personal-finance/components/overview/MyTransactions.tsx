"use client";
import { useRouter } from "next/navigation";
import React from "react";

import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import Transaction from "../Transaction";
import OverviewHeader from "./OverviewHeader";

const MyTransactions = () => {
	const router = useRouter();
	const { transactions } = useSelector((state: RootState) => state.finance);

	const transactionSnippets = [...transactions]
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.slice(0, 5);

	const handleNavigation = () => router.push("/transactions");
	return (
		<aside className="overview-content" aria-label="Recent Transactions">
			<OverviewHeader
				title="Transactions"
				handleNavigation={handleNavigation}
				ariaLabel="Navigate to all transactions page"
				ariaTitle="View All Transactions"
				text="View All"
			/>
			{transactions.length > 0 ? (
				<ul
					className="flex flex-col w-full gap-3"
					role="list"
					aria-label="Most recent transactions"
				>
					{transactionSnippets.map((transaction) => (
						<li key={transaction.id}>
							<Transaction transaction={transaction} />
						</li>
					))}
				</ul>
			) : (
				<p className="text-muted text-p4" role="status" aria-live="polite">
					No recent transactions to show.
				</p>
			)}
		</aside>
	);
};

export default MyTransactions;
