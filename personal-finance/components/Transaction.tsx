"use cleint";
import { TransactionType } from "@/lib/features/financeSlice";
import { toLocaleStringWithCommas } from "@/lib/helperFunctions";
import React from "react";
import { iconMap } from "./constants";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
interface TransactionProps {
	transaction: TransactionType;
	edit?: (transaction: TransactionType | null) => void;
}

const Transaction = ({ transaction, edit }: TransactionProps) => {
	const Icon = iconMap[transaction.category.icon as keyof typeof iconMap] || (() => null);
	const { currency } = useSelector((state: RootState) => state.finance);

	return (
		<article
			className={`flex w-full justify-between items-center rounded-8 cursor-pointer  p-2 hover:scale-101 hover:shadow-[1px_1px_5px] transition-all duration-100
                md:grid md:grid-cols-2 `}
			title="Learn more"
			onClick={() => edit && edit(transaction)}
		>
			{/* Icon and Name */}
			<div className="flex-center-full gap-3 h-full l flex-1">
				{/*TODO CATEGORY ICON ?*/}
				<span className={`flex items-center justify-center w-9 h-9 rounded-full border`}>
					<Icon className={`w-5 h-5 `} />
				</span>
				<div className="flex flex-col h-full gap-1 items-start justify-center md:grid md:grid-cols-[2fr_1fr] md:flex-1 md:items-center">
					<h6 className="text-p4-bold text-fg">{transaction.title}</h6>
					<p className="text-p5 text-muted capitalize">{transaction.category.name}</p>
				</div>
			</div>
			{/* Amount and Date */}
			<div className="flex flex-col items-end justify-center h-full md:grid md:grid-cols-2 md:text-right md:items-center">
				<h6
					className={`text-p4-bold  ${
						transaction.type === "income" && "text-accent"
					} md:order-2`}
				>
					{transaction.type === "expense" ? "-" : "+"}
					{toLocaleStringWithCommas(transaction.amount, currency, 2)}
				</h6>
				<p className="text-p5 text-muted capitalize">
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
