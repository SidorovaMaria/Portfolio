"use client";

import React from "react";
import IconCaretLeft from "../svg/IconCaretLeft";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { categorizeBills, toLocaleStringWithCommas } from "@/lib/helperFunctions";

const MyReccuring = () => {
	const router = useRouter();
	const { transactions, currency } = useSelector((state: RootState) => state.finance);
	const recurringBills = transactions.filter(
		(transaction) => transaction.reccuring && transaction.type === "expense"
	);

	const { unpaidBills, paidBills, dueSoon } = categorizeBills(recurringBills);
	return (
		<aside className="overview-content">
			<div className="flex w-full items-center justify-between">
				<h2 className="text-2 font-bold leading-120">Recurring Bills</h2>
				<button
					className="btn btn-tertiary group duration-300 transition-all"
					onClick={() => router.push("/recurring-bills")}
				>
					See Details
					<span className="ml-3 inline-flex">
						<IconCaretLeft className=" duration-300 transition-all fill-grey-300 rotate-180 group-hover:fill-grey-900" />
					</span>
				</button>
			</div>
			<div className="flex flex-col gap-3 w-full">
				<div className="recurring-card border-secondary-green">
					<p>Paid Bills</p>
					<p className="font-bold text-grey-900">
						{toLocaleStringWithCommas(
							paidBills.reduce((sum, bill) => sum + bill.amount, 0),
							currency,
							2
						)}
					</p>
				</div>
				<div className="recurring-card border-secondary-yellow">
					<p>Total Upcoming</p>
					<p className="font-bold text-grey-900">
						{toLocaleStringWithCommas(
							unpaidBills.reduce((sum, bill) => sum + bill.amount, 0),
							currency,
							2
						)}
					</p>
				</div>
				<div className="recurring-card  border-secondary-cyan ">
					<p>Due Soon</p>
					<p className="font-bold text-grey-900">
						{toLocaleStringWithCommas(
							dueSoon.reduce((sum, bill) => sum + bill.amount, 0),
							currency,
							2
						)}
					</p>
				</div>
			</div>
		</aside>
	);
};

export default MyReccuring;
