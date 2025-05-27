"use client";

import FinanceBalance from "@/components/overview/FinanceBalance";
import Title from "@/components/Title";
import React from "react";

export default function Home() {
	return (
		<>
			<Title title="Overview" />
			<FinanceBalance />
		</>
	);
}
