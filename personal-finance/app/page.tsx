"use client";

import FinanceBalance from "@/components/overview/FinanceBalance";
import PotsOverview from "@/components/overview/PotsOverview";
import Title from "@/components/Title";
import React from "react";

export default function Home() {
	return (
		<>
			<Title title="Overview" />
			<FinanceBalance />
			<div className="w-full bg-violet-300/20 grid grid-cols-1 gap-4 ">
				<PotsOverview />
			</div>
		</>
	);
}
