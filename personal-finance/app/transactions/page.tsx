"use client";
import AddTransaction from "@/components/modals/AddTransaction";
import Title from "@/components/Title";
import Transaction from "@/components/Transaction";
import { TransactionType } from "@/lib/features/financeSlice";
import { RootState } from "@/lib/store";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "motion/react";

export default function Transactions() {
	const [openTransactionModal, setOpenTransactionModal] = useState({
		isOpen: false,
		type: "", // or "edit"
		transaction: null as TransactionType | null, // for editing a specific transaction
	});
	const { transactions } = useSelector((state: RootState) => state.finance);
	const setTransactionToEdit = (transaction: TransactionType | null) => {
		setOpenTransactionModal({
			isOpen: true,
			type: "edit",
			transaction,
		});
	};
	const sortedTransactions = [...transactions].sort((a, b) => {
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	});

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
				<section className="flex gap-4 flex-col w-full">
					{transactions.length > 0 ? (
						sortedTransactions.map((transaction) => (
							<AnimatePresence mode="wait" key={transaction.id}>
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
							</AnimatePresence>
						))
					) : (
						<h4>No Trasmactions Yet</h4>
					)}
				</section>
			</section>
		</>
	);
}
