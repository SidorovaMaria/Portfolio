"use client";
export const dynamic = "force-dynamic";

import { Suspense } from "react";

import TransactionsPage from "./TransactionsPage";
export default function Transactions() {
	return (
		<>
			<Suspense fallback={<div>Loading transactions...</div>}>
				<TransactionsPage />
			</Suspense>
		</>
	);
}
