"use client";
import AddTransaction from "@/components/modals/AddTransaction";
import Title from "@/components/Title";
import Transaction from "@/components/Transaction";
import { TransactionType } from "@/lib/features/financeSlice";
import { RootState } from "@/lib/store";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { CategoriesType, sortByOptions } from "@/components/constants";
import { SearchIcon } from "lucide-react";
import { sortTransactionsByFilter } from "@/lib/helperFunctions";
import DropDown from "@/components/DropDown";
import IconCaretLeft from "@/components/svg/IconCaretLeft";
import IconSortMobile from "@/components/svg/IconSortMobile";
import IconFilterMobile from "@/components/svg/IconFilterMobile";
import { useSearchParams } from "next/navigation";
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
	const searchParams = useSearchParams();
	const initialCategory = searchParams.get("category") || "All Transactions";
	const [filter, setFilter] = useState({
		open: false,
		filter: initialCategory as CategoriesType["name"] | string,
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
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 8; // You can change this to any number you want
	// const [itemsPerPage, setItemsPerPage] = useState(8); //TODO
	const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);
	const paginatedTransactions = useMemo(() => {
		const start = (currentPage - 1) * itemsPerPage;
		const end = start + itemsPerPage;
		return sortedTransactions.slice(start, end);
	}, [sortedTransactions, currentPage, itemsPerPage]);

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
			<section className="flex flex-col w-full gap-6 px-5 ">
				{/* Search and Filter */}
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
					<DropDown
						icon={<IconFilterMobile className="w-5 h-5 fill-grey-900" />}
						minWidth="min-w-[177px]"
						label="Category"
						options={["All Transactions", ...categories.map((c) => c.name)]}
						selected={filter.filter}
						setSelected={(val) => {
							setFilter((prev) => ({ ...prev, filter: val }));
							setCurrentPage(1);
						}}
						open={filter.open}
						setOpen={(val) => {
							setFilter((prev) => ({ ...prev, open: val }));
						}}
					/>
				</div>
				<section className="flex gap-2 flex-col  w-full ">
					{transactions.length > 0 ? (
						paginatedTransactions.map((transaction) => (
							<Transaction
								key={transaction.id}
								transaction={transaction}
								edit={setTransactionToEdit}
							/>
						))
					) : (
						<h4>No Trasmactions Yet</h4>
					)}
				</section>
				<div className="flex items-center w-full justify-between ">
					<button
						className="btn font-normal flex items-center justify-center p-3 rounded-8 btn-secondary disabled:opacity-50 gap-2 disabled:pointer-events-none"
						disabled={currentPage === 1}
						onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
					>
						<IconCaretLeft className="w-4 h-4 fill-grey-500  not-group-disabled:group-hover:fill-grey-900 " />
						<span className="hidden md:block text-4 leading-150 ">Previous </span>
					</button>
					<div className="flex items-center gap-2">
						<p className="text-4 leading-150 text-grey-500">
							Page {currentPage} of {totalPages}
						</p>
					</div>

					<button
						className="btn flex items-center justify-center p-3 rounded-8 btn-secondary disabled:opacity-50 gap-2  font-normal disabled:pointer-events-none"
						disabled={currentPage === totalPages}
						onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
					>
						<span className="hidden md:block text-4 leading-150 ">Next </span>
						<IconCaretLeft className="-rotate-180 w-4 h-4 fill-grey-500 not-group-disabled:group-hover:fill-grey-900 " />
					</button>
				</div>
			</section>
		</>
	);
}
