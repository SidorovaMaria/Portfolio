"use client";
import TotalBills from "@/components/recurring/TotalBills";
import Title from "@/components/Title";

import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import RecurringTransaction from "@/components/recurring/RecurringTransaction";
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
				<div className="flex flex-col gap-6 px-5 py-6 bg-white rounded-12">
					{/* Search BAR */}
					<div className="flex items-center justify-between gap-4 ">
						<label
							htmlFor="search"
							className="flex gap-4 border rounded-8 px-5 py-3 flex-1  "
						>
							<input
								id="search"
								className="w-full flex-1 outline-none text-4 leading-150"
								type="text"
								placeholder="Search Transactions"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
							<SearchIcon className="w-4 h-4 text-grey-900" />
						</label>

						<div className="flex items-center gap-4">
							<DropDown
								icon={<IconSortMobile className="w-5 h-5 fill-grey-900" />}
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
					{/* Recurring Transactions List */}

					{/* Larger Screen Columns */}
					<aside
						className="md:grid grid-cols-2 hidden
                    text-5 text-grey-500 leading-150"
					>
						<p className="">Bill Title</p>
						<div className="grid grid-cols-2 justify-between">
							<p>Due Date</p>
							<p className="text-right">Amount</p>
						</div>
					</aside>
					<ul className="flex flex-col gap-5 w-full">
						{sortedTransactions.length > 0 ? (
							sortedTransactions.map((transaction) => (
								<RecurringTransaction
									key={transaction.id}
									transaction={transaction}
								/>
							))
						) : (
							<p className="text-5 text-grey-500">No recurring bills found.</p>
						)}
					</ul>
				</div>
			</section>
		</>
	);
}
