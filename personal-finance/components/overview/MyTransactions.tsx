"use client";
import { useRouter } from "next/navigation";
import React from "react";
import IconCaretLeft from "../svg/IconCaretLeft";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import Transaction from "../Transaction";

const MyTransactions = () => {
	const router = useRouter();
	const { transactions } = useSelector((state: RootState) => state.finance);
	const transactionSnippets = [...transactions]
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.slice(0, 5);
	return (
		<aside className="overview-content">
			<div className="flex-between">
				<h2 className="text-2 font-bold leading-120">Transactions</h2>
				<button
					className="btn btn-tertiary group duration-300 transition-all"
					onClick={() => router.push("/transactions")}
				>
					View All
					<span className="ml-3 inline-flex">
						<IconCaretLeft className=" duration-300 transition-all fill-grey-300 rotate-180 group-hover:fill-grey-900" />
					</span>
				</button>
			</div>
			<div className="flex flex-col w-full gap-3">
				{transactions.length > 0
					? transactionSnippets
							.slice(0, 5)
							.map((transaction) => (
								<Transaction transaction={transaction} key={transaction.id} />
							))
					: null}
			</div>
		</aside>
	);
};

export default MyTransactions;
