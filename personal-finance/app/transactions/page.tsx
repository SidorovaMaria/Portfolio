"use client";
export const dynamic = "force-dynamic";
import AddTransaction from "@/components/modals/AddTransaction";
import Title from "@/components/Title";
import Transaction from "@/components/Transaction";

import { RootState } from "@/lib/store";
import { use, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { sortByOptions } from "@/components/constants";
import { Plus } from "lucide-react";
import { sortTransactionsByFilter } from "@/lib/helperFunctions";

import IconCaretLeft from "@/components/svg/IconCaretLeft";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SortingBlock from "./SortingBlock";
import { TransactionType } from "@/components/constants/types";
export default function Transactions() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	// Read from URL params or fallback to defaults
	const initialCategory = searchParams.get("category") || "All Transactions";
	const initialSearch = searchParams.get("search") || "";
	const initialSort = searchParams.get("sort") || sortByOptions[0];

	// Keep filter/search/sort as state
	const [filter, setFilter] = useState(initialCategory);
	const [search, setSearch] = useState(initialSearch);
	const [sortBy, setSortBy] = useState(initialSort);
	useEffect(() => {
		if (
			!searchParams.has("category") &&
			!searchParams.has("search") &&
			!searchParams.has("sort")
		) {
			setFilter("All Transactions");
			setSearch("");
			setSortBy(sortByOptions[0]);
		}
	}, [searchParams]);

	// Update URL when filter/search/sort change
	useEffect(() => {
		const params = new URLSearchParams();

		if (filter && filter !== "All Transactions") {
			params.set("category", filter);
		}
		if (search) {
			params.set("search", search);
		}
		if (sortBy && sortBy !== sortByOptions[0]) {
			params.set("sort", sortBy);
		}

		// Update URL without full page reload
		router.replace(`/transactions?${params.toString()}`, { scroll: false });
	}, [filter, search, sortBy, router]);

	// Redux data
	const { transactions, categories } = useSelector((state: RootState) => state.finance);

	// Filter + sort transactions
	const filteredTransactions = useMemo(() => {
		return transactions
			.filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
			.filter((t) => filter === "All Transactions" || t.category.name === filter);
	}, [transactions, filter, search]);

	const sortedTransactions = useMemo(() => {
		return sortTransactionsByFilter(filteredTransactions, sortBy);
	}, [filteredTransactions, sortBy]);

	// Pagination
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 8;
	const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);
	const paginatedTransactions = useMemo(() => {
		const start = (currentPage - 1) * itemsPerPage;
		return sortedTransactions.slice(start, start + itemsPerPage);
	}, [sortedTransactions, currentPage]);

	// Transaction modal state
	const [openTransactionModal, setOpenTransactionModal] = useState({
		isOpen: false,
		type: "",
		transaction: null as TransactionType | null,
	});

	const setTransactionToEdit = (transaction: TransactionType | null) => {
		setOpenTransactionModal({
			isOpen: true,
			type: "edit",
			transaction,
		});
	};

	return (
		<>
			<Title
				title="Transactions"
				btn
				btnText="Add "
				onClick={() =>
					setOpenTransactionModal((prev) => ({
						...prev,
						isOpen: true,
						type: "add",
						transaction: null,
					}))
				}
			>
				<Plus className="w-5 h-5 stroke-[4px] fill-fg" />
			</Title>

			<AddTransaction
				mode={openTransactionModal.type as "add" | "edit"}
				open={openTransactionModal.isOpen}
				close={() =>
					setOpenTransactionModal({ isOpen: false, type: "", transaction: null })
				}
				transaction={openTransactionModal.transaction}
			/>
			<section className="flex-column gap-6 px-5 min-h-[40vh]">
				{/* Search and Filter */}
				{/* <SortingBlock /> */}
				<SortingBlock
					search={search}
					setSearch={setSearch}
					filter={filter}
					setFilter={setFilter}
					sortBy={sortBy}
					setSortBy={setSortBy}
					categories={categories}
				/>

				<section className="flex gap-2 flex-col w-full ">
					{transactions.length > 0 ? (
						paginatedTransactions.length > 0 ? (
							<>
								<ul className="md:flex items-center justify-between text-p5 text-muted w-full pb-3 px-2 hidden">
									<li className="grid grid-cols-[2fr_1fr] w-full ">
										<p> Transaction Title</p>
										<p className="pl-3">Category</p>
									</li>
									<li className="grid grid-cols-2 w-full">
										<p className="text-right ">Transaction Date</p>
										<p className="text-right">Amount</p>
									</li>
								</ul>
								{paginatedTransactions.map((transaction) => (
									<Transaction
										key={transaction.id}
										transaction={transaction}
										edit={setTransactionToEdit}
									/>
								))}
							</>
						) : (
							<p
								className="text-p4 text-muted text-center"
								role="status"
								aria-live="polite"
							>
								No transactions found for the selected filter or/and search
								criteria.
							</p>
						)
					) : (
						<p
							className="text-p4 text-muted text-center"
							role="status"
							aria-live="polite"
						>
							No transactions to show.
						</p>
					)}
				</section>
				<div className="flex-between ">
					<button
						className="btn btn-secondary py-2 disabled:opacity-30 group disabled:pointer-events-none"
						disabled={currentPage === 1}
						onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
					>
						<IconCaretLeft className="size-4 fill-muted mr-2 group-hover:fill-fg " />
						<span className="hidden md:block text-p4 text-muted  group-hover:text-fg ">
							Previous{" "}
						</span>
					</button>
					<div className="flex items-center gap-2">
						<p className="text-p4 text-muted">
							Page <span className="text-fg font-bold">{currentPage}</span> of{" "}
							{totalPages}
						</p>
					</div>

					<button
						className="btn btn-secondary py-2 disabled:opacity-30 disabled:pointer-events-none group"
						disabled={currentPage === totalPages}
						onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
					>
						<span className="hidden md:block text-p4  text-muted group-hover:text-fg">
							Next{" "}
						</span>
						<IconCaretLeft className="-rotate-180 size-4 fill-muted ml-2 group-hover:fill-fg" />
					</button>
				</div>
			</section>
		</>
	);
}
