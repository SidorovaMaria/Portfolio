"use client";
import AddTransaction from "@/components/modals/AddTransaction";
import Title from "@/components/Title";
import Transaction from "@/components/Transaction";
import { RootState } from "@/lib/store";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Transactions() {
	const [openTransactionModal, setOpenTransactionModal] = useState({
		isOpen: false,
		type: "", // or "edit"
		transactionId: null, // for editing a specific transaction
	});
	const { transactions } = useSelector((state: RootState) => state.finance);
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
					}))
				}
			/>
			<AddTransaction
				mode={openTransactionModal.type as "add" | "edit"}
				open={openTransactionModal.isOpen}
				close={() =>
					setOpenTransactionModal({ isOpen: false, type: "", transactionId: null })
				}
				transaction={null}
			/>
			<section className="flex flex-col w-full gap-6 px-5 py-6md:p-8 rounded-8 bg-white">
				{/* Search and Filter */}
				<section className="flex gap-4 flex-col w-full">
					{transactions.length > 0 ? (
						transactions.map((transaction) => (
							<Transaction key={transaction.id} transaction={transaction} />
						))
					) : (
						<h4>No Trasmactions Yet</h4>
					)}
				</section>
			</section>
		</>
	);
}
