"use client";
import { TransactionType } from "@/lib/features/financeSlice";
import { iconMap } from "../../components/constants";
import {
	getOrdinal,
	RecurringStatusTransaction,
	toLocaleStringWithCommas,
} from "@/lib/helperFunctions";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import IconWarning from "../../components/svg/IconWarning";
import IconCheck from "../../components/svg/IconCheck";
interface RecurringTransactionProps {
	transaction: TransactionType;
}
const RecurringTransaction = ({ transaction }: RecurringTransactionProps) => {
	const Icon = iconMap[transaction.category.icon as keyof typeof iconMap] || (() => null);
	const { currency } = useSelector((state: RootState) => state.finance);
	const status = RecurringStatusTransaction(transaction);
	let style = "";
	let icon = null;
	if (status === "Unpaid") {
		style = "text-fg";
	} else if (status === "Paid") {
		style = "text-accent";
		icon = <IconCheck className="w-4 h-4 fill-accent" />;
	} else if (status === "Due Soon") {
		style = "text-danger";
		icon = <IconWarning className="w-4 h-4 fill-danger" />;
	}

	return (
		<aside
			className={`flex-column md:grid md:grid-cols-2 gap-2 p-2 rounded-8 cursor-pointer hover:scale-101 hover:shadow-[1px_1px_5px] transition-all duration-100 `}
		>
			<div className="flex-center-full gap-3 h-full flex-1">
				<span className={`flex-center size-8 rounded-full border`}>
					<Icon className={`size-4`} />
				</span>
				<h6 className="text-p4-bold">{transaction.title}</h6>
			</div>
			<div className="flex-between">
				<p className={`text-p5 text-muted capitalize ${style}`}>
					Monthly -{" "}
					{(() => {
						const day = new Date(transaction.date).getDate();
						return `${day}${getOrdinal(day)}`;
					})()}
					{icon && <span className="ml-2 inline-flex align-top">{icon}</span>}
				</p>
				<p className={`text-p4-bold ${style}`}>
					{toLocaleStringWithCommas(transaction.amount, currency, 2)}
				</p>
			</div>
		</aside>
	);
};

export default RecurringTransaction;
