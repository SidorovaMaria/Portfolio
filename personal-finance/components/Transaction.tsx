import { TransactionType } from "@/lib/features/financeSlice";
import { toLocaleStringWithCommas } from "@/lib/helperFunctions";
import React from "react";
interface TransactionProps {
	transaction: TransactionType;
}

const Transaction = ({ transaction }: TransactionProps) => {
	return (
		<article className="flex w-full justify-between items-center rounded-8">
			{/* Icon and Name */}
			<div className="flex items-center gap-3 h-full w-full flex-1">
				{/*TODO CATEGORY ICON ?*/}
				<span className="w-8 h-8 bg-red-500 rounded-full"></span>
				<div className="flex flex-col h-full gap-1 items-start justify-center">
					<h6 className="text-4 font-bold leading-150 text-grey-900">
						{transaction.title}
					</h6>
					<p className="text-5 text-grey-500 leading-150 capitalize">
						{transaction.category}
					</p>
				</div>
			</div>
			{/* Amount and Date */}
			<div className="flex flex-col items-end justify-center h-full ">
				<h6
					className={`text-4 font-bold leading-150 ${
						transaction.type === "income" && "text-secondary-green"
					} `}
				>
					{transaction.type === "expense" ? "-" : "+"}
					{toLocaleStringWithCommas(transaction.amount, "USD", 2)}
				</h6>
				<p className="text-5 text-grey-500 leading-150 capitalize">
					{new Date(transaction.date).toLocaleDateString("en-US", {
						day: "2-digit",
						month: "short",
						year: "numeric",
					})}
				</p>
			</div>
		</article>
	);
};

export default Transaction;
