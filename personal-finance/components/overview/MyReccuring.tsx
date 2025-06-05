"use client";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { categorizeBills, toLocaleStringWithCommas } from "@/lib/helperFunctions";
import OverviewHeader from "./OverviewHeader";

const MyReccuring = () => {
	const router = useRouter();
	const { transactions, currency } = useSelector((state: RootState) => state.finance);

	const recurringBills = transactions.filter(
		(transaction) => transaction.reccuring && transaction.type === "expense"
	);
	const { unpaidBills, paidBills, dueSoon } = categorizeBills(recurringBills);

	const handleNavigation = () => router.push("/recurring-bills");
	return (
		<aside className="overview-content" aria-labelledby="recurring-bills-overview">
			<OverviewHeader
				title="Recurring Bills"
				handleNavigation={handleNavigation}
				ariaLabel="Navigate to all recurring bills page"
				ariaTitle="View All Recurring Bills"
				text="See Details"
			/>

			<ul className="flex-column gap-3" aria-labelledby="recurring-bills-summary">
				<RecurringCard
					text="Paid Bills"
					className="border-accent "
					value={toLocaleStringWithCommas(
						paidBills.reduce((sum, bill) => sum + bill.amount, 0),
						currency,
						2
					)}
				/>
				<RecurringCard
					text="Total Upcoming"
					className="border-yellow-500 "
					value={toLocaleStringWithCommas(
						unpaidBills.reduce((sum, bill) => sum + bill.amount, 0),
						currency,
						2
					)}
				/>
				<RecurringCard
					text="Due Soon"
					className="border-danger "
					value={toLocaleStringWithCommas(
						dueSoon.reduce((sum, bill) => sum + bill.amount, 0),
						currency,
						2
					)}
				/>
			</ul>
		</aside>
	);
};

export default MyReccuring;
interface RecurringCardProps {
	text: string;
	className?: string;
	value: string;
}

const RecurringCard = ({ text, className = "", value }: RecurringCardProps) => (
	<li className={`recurring-card ${className}`} aria-label={`${text}: ${value}`}>
		<p id={`${text}-label`}>{text}</p>
		<p className="font-bold text-grey-900">{value}</p>
	</li>
);
