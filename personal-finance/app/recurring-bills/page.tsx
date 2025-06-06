"use client";
import TotalBills from "@/app/recurring-bills/TotalBills";
import Title from "@/components/Title";

import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import RecurringTransaction from "@/app/recurring-bills/RecurringTransaction";
import { sortByOptions } from "@/components/constants";
import { useMemo, useState } from "react";
import { sortRecurringTransactionsByFilter } from "@/lib/helperFunctions";
import DropDown from "@/components/DropDown";
import IconSortMobile from "@/components/svg/IconSortMobile";
import { SearchIcon } from "lucide-react";

export default function RecurringBills() {
	const { transactions } = useSelector((state: RootState) => state.finance);
	const recurringTransactions = transactions.filter(
		(transaction) => transaction.reccuring && transaction.type === "expense"
	);
	const [sortBy, setSortBy] = useState({
		open: false,
		sort: sortByOptions[0], //Newest First
	});
	const [search, setSearch] = useState<string>("");
	const sortedTransactions = useMemo(() => {
		const filtered = recurringTransactions.filter((t) =>
			t.title.toLowerCase().includes(search.toLowerCase())
		);
		return sortRecurringTransactionsByFilter(filtered, sortBy.sort);
	}, [recurringTransactions, search, sortBy.sort]);

	return (
		<>
			<Title title="Recurring Bills" />
			<section className="grid grid-cols-1 gap-6 w-full lg:grid-cols-[1fr_2fr] justify-start items-start">
				<TotalBills />
				<div className="flex-column gap-6 px-5 py-6 bg-bg rounded-12">
					{/* Search BAR */}
					<div className="flex-between gap-4 ">
						<label htmlFor="search" className="input-container flex-1 group">
							<input
								id="search"
								className="w-full flex-1 outline-none text-p4"
								type="text"
								placeholder="Search Transactions"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
							<SearchIcon className="size-4 text-muted group-focus-within:text-fg" />
						</label>

						<div className="flex-center gap-4">
							<DropDown
								icon={<IconSortMobile className="size-5 fill-fg" />}
								label="Sort By"
								options={sortByOptions}
								selected={sortBy.sort}
								setSelected={(val) => {
									setSortBy((prev) => ({
										...prev,
										sort: val,
									}));
								}}
								open={sortBy.open}
								setOpen={(val) => setSortBy((prev) => ({ ...prev, open: val }))}
							/>
						</div>
					</div>

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
