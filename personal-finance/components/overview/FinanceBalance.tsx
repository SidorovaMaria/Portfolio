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
			<div className="balance-card bg-gradient-to-b  from-white to-secondary-green text-secondary-green ">
				<p className="text-4 font-semibold leading-150">
					Income{" "}
					<span className="text-3 font-bold ">
						({new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date())})
					</span>
				</p>
				<p className="leading-120 text-1 font-bold text-white">
					{toLocaleStringWithCommas(balance.income, currency)}
				</p>
			</div>
			<div className="balance-card   bg-gradient-to-b  from-white to-secondary-red text-secondary-red ">
				<p className="text-4 leading-150">
					Expenses{" "}
					<span className="text-3 font-bold">
						({new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date())})
					</span>
				</p>
				<p className="leading-120 text-1 font-bold text-white">
					{toLocaleStringWithCommas(balance.expenses, currency)}
				</p>
			</div>
		</section>
	);
};

export default FinanceBalance;
