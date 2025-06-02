"use cleint";
import { TransactionType } from "@/lib/features/financeSlice";
import { toLocaleStringWithCommas } from "@/lib/helperFunctions";
import React from "react";
import { iconMap } from "./constants";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
// import TransactionOverview from "./modals/TransactionOverview";
interface TransactionProps {
	transaction: TransactionType;
	edit?: (transaction: TransactionType | null) => void;
}

const Transaction = ({ transaction, edit }: TransactionProps) => {
	const Icon = iconMap[transaction.category.icon];
	const { currency } = useSelector((state: RootState) => state.finance);

	return (
		<article
			className={`flex w-full justify-between items-center rounded-8 cursor-pointer  p-2 hover:scale-101 hover:shadow-[1px_1px_5px] transition-all duration-100 ${
				transaction.type === "expense"
					? "hover:bg-secondary-red/20  shadow-secondary-red"
					: "hover:bg-secondary-green/20 shadow-secondary-green"
			}`}
			title="Learn more"
			onClick={() => edit && edit(transaction)}
		>
			{/* Icon and Name */}
			<div className="flex items-center gap-3 h-full w-full flex-1">
				{/*TODO CATEGORY ICON ?*/}
				<span className={`flex items-center justify-center w-9 h-9 rounded-full  border`}>
					<Icon className={`w-5 h-5 `} />
				</span>
				<div className="flex flex-col h-full gap-1 items-start justify-center">
					<h6 className="text-4 font-bold leading-150 text-grey-900">
						{transaction.title}
					</h6>
					<p className="text-5 text-grey-500 leading-150 capitalize">
						{transaction.category.name}
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
					{toLocaleStringWithCommas(transaction.amount, currency, 2)}
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
