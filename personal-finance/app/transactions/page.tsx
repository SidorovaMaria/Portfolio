"use client";
import AddTransaction from "@/components/modals/AddTransaction";
import Title from "@/components/Title";
import Transaction from "@/components/Transaction";
import { TransactionType } from "@/lib/features/financeSlice";
import { RootState } from "@/lib/store";

import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "motion/react";
import { CategoriesType, sortByOptions } from "@/components/constants";
import { SearchIcon } from "lucide-react";

import { sortTransactionsByFilter } from "@/lib/helperFunctions";
import DropDown from "@/components/DropDown";

export default function Transactions() {
	const [openTransactionModal, setOpenTransactionModal] = useState({
		isOpen: false,
		type: "",
		transaction: null as TransactionType | null, // for editing a specific transaction
	});
	const { transactions, categories } = useSelector((state: RootState) => state.finance);
	const setTransactionToEdit = (transaction: TransactionType | null) => {
		setOpenTransactionModal({
			isOpen: true,
			type: "edit",
			transaction,
		});
	};

	const [sortBy, setSortBy] = useState({
		open: false,
		sort: sortByOptions[0],
	});
	const [filter, setFilter] = useState({
		open: false,
		filter: "All Transactions" as CategoriesType["name"] | string,
	});
	const [search, setSearch] = useState<string>("");

	const sortedTransactions = useMemo(() => {
		const filtered = transactions
			.filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
			.filter(
				(t) => filter.filter === "All Transactions" || t.category.name === filter.filter
			);

		return sortTransactionsByFilter(filtered, sortBy.sort);
	}, [transactions, search, filter.filter, sortBy.sort]);

	return (
		<>
			<Title
				title="Transactions"
				btn
				btnText="+ Add "
				onClick={() =>
					setOpenTransactionModal((prev) => ({
						...prev,
						isOpen: true,
						type: "add",
						transaction: null,
					}))
				}
			/>
			<AddTransaction
				mode={openTransactionModal.type as "add" | "edit"}
				open={openTransactionModal.isOpen}
				close={() =>
					setOpenTransactionModal({ isOpen: false, type: "", transaction: null })
				}
				transaction={openTransactionModal.transaction}
			/>
			<section className="flex flex-col w-full gap-6 px-5 py-6md:p-8 rounded-8 bg-white">
				{/* Search and Filter */}
				<div className="flex items-center justify-between gap-4">
					<label
						htmlFor="search"
						className="flex gap-4 border rounded-8 px-5 py-3 flex-1 "
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
					<DropDown
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
					<DropDown
						minWidth="min-w-[177px]"
						label="Category"
						options={["All Transactions", ...categories.map((c) => c.name)]}
						selected={filter.filter}
						setSelected={(val) => setFilter((prev) => ({ ...prev, filter: val }))}
						open={filter.open}
						setOpen={(val) => setFilter((prev) => ({ ...prev, open: val }))}
					/>
				</div>
				<section className="flex gap-4 flex-col w-full">
					{transactions.length > 0 ? (
						sortedTransactions.map((transaction) => (
							// <AnimatePresence mode="wait" key={transaction.id}>
							<motion.article
								key={transaction.id}
								initial={false}
								layout={true}
								transition={{ duration: 0.2 }}
							>
								<Transaction
									transaction={transaction}
									edit={setTransactionToEdit}
								/>
							</motion.article>
							// </AnimatePresence>
						))
					) : (
						<h4>No Trasmactions Yet</h4>
					)}
				</section>
			</section>
		</>
	);
}
