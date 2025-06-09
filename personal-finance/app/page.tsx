"use client";

import FinanceBalance from "@/components/overview/FinanceBalance";
import MyBudget from "@/components/overview/MyBudget";
import MyReccuring from "@/components/overview/MyReccuring";
import MyTransactions from "@/components/overview/MyTransactions";
import PotsOverview from "@/components/overview/PotsOverview";
import Title from "@/components/Title";
import React from "react";

export default function Home() {
	return (
		<>
			<Title title="Overview" />
			<FinanceBalance />
			<div className="w-full grid grid-cols-1 gap-4 xl:grid-cols-2 xl:grid-row-6 ">
				<div className="xl:[grid-area:1/1/3/2]">
					<PotsOverview />
				</div>
				<div className="xl:[grid-area:3/1/7/2]">
					<MyTransactions />
				</div>
				<div className="xl:[grid-area:1/2/5/3]">
					<MyBudget />
				</div>
				<div className="xl:[grid-area:5/2/6/3]">
					<MyReccuring />
				</div>
			</div>
		</>
	);
}
