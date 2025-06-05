"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import { toLocaleStringWithCommas } from "@/lib/helperFunctions";

const FinanceBalance = () => {
	const { balance, currency } = useSelector((state: RootState) => state.finance);
	const currentMonth = new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date());

	return (
		<section className="flex-column gap-3  items-start justify-start md:flex-row md:gap-6">
			<BalanceCard
				className="bg-fg text-bg"
				title="Current Balance"
				value={toLocaleStringWithCommas(balance.current, currency)}
			/>
			<BalanceCard
				className=" bg-accent text-bg dark:text-fg"
				title={`Income (${currentMonth})`}
				value={toLocaleStringWithCommas(balance.income, currency)}
			/>
			<BalanceCard
				className=" bg-danger text-bg dark:text-fg"
				title={`Expenses (${currentMonth})`}
				value={toLocaleStringWithCommas(balance.expenses, currency)}
			/>
		</section>
	);
};

export default FinanceBalance;

interface BalanceCardProps {
	title: string;
	value: string;
	className?: string;
}

const BalanceCard = ({ title, value, className = "" }: BalanceCardProps) => (
	<article className={`balance-card ${className}`}>
		<p className="text-p4">{title}</p>
		<p className="text-h1">{value}</p>
	</article>
);
