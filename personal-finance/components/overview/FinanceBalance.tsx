"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import { toLocaleStringWithCommas } from "@/lib/helperFunctions";

const FinanceBalance = () => {
	const { balance, currency } = useSelector((state: RootState) => state.finance);
	console.log(balance);

	return (
		<section className="flex flex-col gap-3 w-full items-start justify-start md:flex-row md:gap-6">
			<div className="bg-grey-900 text-white balance-card  ">
				<p className="text-4 leading-150">Current Balance</p>
				<p className="leading-120 text-1 font-bold">
					{toLocaleStringWithCommas(balance.current, currency)}
				</p>
			</div>
			<div className="balance-card ">
				<p className="text-4 leading-150">Income</p>
				<p className="leading-120 text-1 font-bold text-grey-900">
					{toLocaleStringWithCommas(balance.income, currency)}
				</p>
			</div>
			<div className="balance-card ">
				<p className="text-4 leading-150">Expenses</p>
				<p className="leading-120 text-1 font-bold text-grey-900">
					{toLocaleStringWithCommas(balance.expenses, currency)}
				</p>
			</div>
		</section>
	);
};

export default FinanceBalance;
