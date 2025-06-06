"use client";
import { categorizeBills, toLocaleStringWithCommas } from "@/lib/helperFunctions";
import { RootState } from "@/lib/store";

import React from "react";
import { useSelector } from "react-redux";
import IconRecurringBills from "../../components/svg/IconRecurringBills";

const TotalBills = () => {
	const { transactions, currency } = useSelector((state: RootState) => state.finance);
	const recurringBills = transactions.filter(
		(transaction) => transaction.reccuring && transaction.type === "expense"
	);
	const totalBill = recurringBills.reduce((sum, bill) => sum + bill.amount, 0);

	const { unpaidBills, paidBills, dueSoon } = categorizeBills(recurringBills);
	return (
		<section className="grid grid-cols-1 w-full gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-1 lg:gap-6">
			<div
				className="flex justify-start gap-5 px-5 py-6 items-center w-full bg-fg rounded-12
            md:flex-col md:gap-8 md:p-6 md:items-start lg:max-h-fit"
			>
				<IconRecurringBills className="size-8 md:scale-150 md:mt-4 md:ml-2 fill-bg" />
				<div className="flex-column gap-2.5 md:justify-end">
					<p className="text-p4 text-bg">Total Bills</p>
					<p className="text-h1 text-bg">
						{toLocaleStringWithCommas(totalBill, currency, 2)}
					</p>
				</div>
			</div>
			<div className="flex-column gap-5 p-5 rounded-12 bg-bg  max-h-fit ">
				<h5 className="text-h3 ">Summary</h5>
				<ul className="flex-column gap-4 ">
					<SummaryItem
						label="Paid Bills"
						length={paidBills.length}
						total={toLocaleStringWithCommas(
							paidBills.reduce((sum, bill) => sum + bill.amount, 0),
							currency,
							2
						)}
					/>
					<hr />
					<SummaryItem
						label="Total Upcoming"
						length={unpaidBills.length}
						total={toLocaleStringWithCommas(
							unpaidBills.reduce((sum, bill) => sum + bill.amount, 0),
							currency,
							2
						)}
					/>
					<hr />
					<SummaryItem
						label="Due Soon"
						length={dueSoon.length}
						total={toLocaleStringWithCommas(
							dueSoon.reduce((sum, bill) => sum + bill.amount, 0),
							currency,
							2
						)}
					/>
				</ul>
			</div>
		</section>
	);
};

export default TotalBills;
interface SummaryItemProps {
	label: string;
	length: number;
	total: string;
}
const SummaryItem = ({ label, length, total }: SummaryItemProps) => (
	<li className="flex-between">
		<p className="text-p5 text-muted ">{label}</p>
		<p className="text-p5-bold">
			{length} ({total})
		</p>
	</li>
);
