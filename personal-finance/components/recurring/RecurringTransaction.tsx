"use client";
import { TransactionType } from "@/lib/features/financeSlice";
import { iconMap } from "../constants";
import {
	getOrdinal,
	RecurringStatusTransaction,
	toLocaleStringWithCommas,
} from "@/lib/helperFunctions";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import IconWarning from "../svg/IconWarning";
import IconCheck from "../svg/IconCheck";
interface RecurringTransactionProps {
	transaction: TransactionType;
}
const RecurringTransaction = ({ transaction }: RecurringTransactionProps) => {
	const Icon = iconMap[transaction.category.icon as keyof typeof iconMap] || (() => null);
	const { currency } = useSelector((state: RootState) => state.finance);
	const status = RecurringStatusTransaction(transaction);
	let style = "";
	let hoverStyle = "";
	let icon = null;
	if (status === "Unpaid") {
		style = "text-secondary-navy";
		hoverStyle = "hover:bg-secondary-navy/20 shadow-secondary-navy";
	} else if (status === "Paid") {
		style = "text-secondary-green";
		hoverStyle = "hover:bg-secondary-green/20 shadow-secondary-green";
		icon = <IconCheck className="w-4 h-4 fill-secondary-green" />;
	} else if (status === "Due Soon") {
		hoverStyle = "hover:bg-secondary-red/20 shadow-secondary-red";
		style = "text-secondary-red";
		icon = <IconWarning className="w-4 h-4 fill-secondary-red" />;
	}

	return (
		<aside
			className={`flex w-full flex-col md:grid md:grid-cols-2 gap-2 p-1 md:py-2 rounded-8 cursor-pointer  hover:scale-101 hover:shadow-[1px_1px_5px] transition-all duration-100 ${hoverStyle}`}
		>
			<div className="flex items-center gap-3 h-full w-full flex-1">
				<span className={`flex items-center justify-center w-8 h-8 rounded-full  border`}>
					<Icon className={`w-4 h-4 `} />
				</span>
				<h6 className="text-4 font-bold leading-150 text-grey-900">{transaction.title}</h6>
			</div>
			<div className="flex-between">
				<p className={`text-5 text-grey-500 leading-150 capitalize ${style}`}>
					Monthly -{" "}
					{(() => {
						const day = new Date(transaction.date).getDate();
						return `${day}${getOrdinal(day)}`;
					})()}
					{icon && <span className="ml-2 inline-flex align-top">{icon}</span>}
				</p>
				<p className={`text-4 font-bold leading-150 ${style}`}>
					{toLocaleStringWithCommas(transaction.amount, currency, 2)}
				</p>
			</div>
		</aside>
	);
};

export default RecurringTransaction;
