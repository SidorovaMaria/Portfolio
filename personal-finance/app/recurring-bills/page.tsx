"use client";
import TotalBills from "@/app/recurring-bills/TotalBills";
import Title from "@/components/Title";

import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import RecurringTransaction from "@/app/recurring-bills/RecurringTransaction";
import { sortByOptions, sortRecurringTransactionsFilter } from "@/components/constants";
import { useEffect, useMemo, useState } from "react";
import {
	filterRecurringTransactionsByCategory,
	sortRecurringTransactionsByFilter,
} from "@/lib/helperFunctions";
import { useRouter, useSearchParams } from "next/navigation";
import SortingBlock from "../transactions/SortingBlock";

export default function RecurringBills() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const { transactions } = useSelector((state: RootState) => state.finance);
	const recurringTransactions = transactions.filter(
		(transaction) => transaction.reccuring && transaction.type === "expense"
	);
	const initialSort = searchParams.get("sort") || sortByOptions[0];
	const initialSearch = searchParams.get("search") || "";
	const initialCategory = searchParams.get("filter") || "All Transactions";
	const [sortBy, setSortBy] = useState(initialSort);
	const [search, setSearch] = useState(initialSearch);
	const [filter, setFilter] = useState(initialCategory) || "All Transactions";

	useEffect(() => {
		const params = new URLSearchParams();

		if (search) {
			params.set("search", search);
		}
		if (sortBy && sortBy !== sortByOptions[0]) {
			params.set("sort", sortBy);
		}
		if (filter && filter !== "All") {
			params.set("filter", filter);
		}

		// Update URL without full page reload
		router.replace(`/recurring-bills?${params.toString()}`, { scroll: false });
	}, [search, sortBy, router, filter]);
	console.log(filter, filterRecurringTransactionsByCategory(recurringTransactions, filter));

	const sortedTransactions = useMemo(() => {
		const searched = recurringTransactions.filter((t) =>
			t.title.toLowerCase().includes(search.toLowerCase())
		);
		const filtered = filterRecurringTransactionsByCategory(searched, filter);

		return sortRecurringTransactionsByFilter(filtered, sortBy);
	}, [recurringTransactions, search, sortBy, filter]);

	return (
		<>
			<Title title="Recurring Bills" />
			<section className="grid grid-cols-1 gap-6 w-full lg:grid-cols-[1fr_2fr] justify-start items-start">
				<TotalBills />
				<div className="flex-column gap-6 px-5 py-6 bg-bg rounded-12">
					{/* Search BAR */}
					<SortingBlock
						search={search}
						setSearch={setSearch}
						filter={filter}
						setFilter={setFilter}
						sortBy={sortBy}
						setSortBy={setSortBy}
						categories={sortRecurringTransactionsFilter}
					/>

					{/* Larger Screen Columns */}
					<aside
						className="md:grid grid-cols-2 hidden
                    text-p5 text-muted px-2"
					>
						<p className="">Bill Title</p>
						<div className="grid grid-cols-2 justify-between">
							<p>Due Date</p>
							<p className="text-right">Amount</p>
						</div>
					</aside>
					<ul className="flex-column gap-5 w-full">
						{sortedTransactions.length > 0 ? (
							sortedTransactions.map((transaction) => (
								<RecurringTransaction
									key={transaction.id}
									transaction={transaction}
								/>
							))
						) : (
							<p className="text-5 text-muted">No recurring bills found.</p>
						)}
					</ul>
				</div>
			</section>
		</>
	);
}
