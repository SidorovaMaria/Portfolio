"use client";
import { categorizeBills, toLocaleStringWithCommas } from "@/lib/helperFunctions";
import { RootState } from "@/lib/store";

import React from "react";
import { useSelector } from "react-redux";
import IconRecurringBills from "../svg/IconRecurringBills";

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
				className="flex justify-start gap-5 px-5 py-6 items-center w-full bg-grey-900 rounded-12
            md:flex-col md:gap-8 md:p-6 md:items-start lg:max-h-fit"
			>
				<IconRecurringBills className="w-8 h-8 flex-shrink-0 md:scale-150 md:mt-4 md:ml-2 fill-white" />
				<div className="flex flex-col gap-2.5 w-full md:justify-end">
					<p className="text-4 leading-150 text-white">Total Bills</p>
					<p className="text-1 font-bold leading-120 text-white">
						{toLocaleStringWithCommas(totalBill, currency, 2)}
					</p>
				</div>
			</div>
			<div className="flex flex-col gap-5 p-5 rounded-12 bg-white w-full max-h-fit ">
				<h5 className="text-3 font-bold leading-150">Summary</h5>
				<ul className="flex flex-col gap-4 w-full">
					<li className="flex-between">
						<p className="text-5 text-grey-500 leading-150 ">Paid Bills</p>
						<p className="text-5 font-bold leading-120">
							{paidBills.length} (
							{toLocaleStringWithCommas(
								paidBills.reduce((sum, bill) => sum + bill.amount, 0),
								currency,
								2
							)}
							)
						</p>
					</li>
					<hr />
					<li className="flex-between">
						<p className="text-5 text-grey-500 leading-150 ">Total Upcoming</p>
						<p className="text-5 font-bold leading-120">
							{unpaidBills.length} (
							{toLocaleStringWithCommas(
								unpaidBills.reduce((sum, bill) => sum + bill.amount, 0),
								currency,
								2
							)}
							)
						</p>
					</li>
					<hr />
					<li className="flex-between">
						<p className="text-5 text-secondary-red leading-150 ">Due Soon</p>
						<p className="text-5 font-bold leading-120">
							{dueSoon.length} (
							{toLocaleStringWithCommas(
								dueSoon.reduce((sum, bill) => sum + bill.amount, 0),
								currency,
								2
							)}
							)
						</p>
					</li>
				</ul>
			</div>
		</section>
	);
};

export default TotalBills;
