import { Suspense } from "react";
import ReccuringBillsPage from "./ReccuringBillsPage";

export default function RecurringBills() {
	return (
		<Suspense fallback={<div>Loading Reccuring Bills...</div>}>
			<ReccuringBillsPage />
		</Suspense>
	);
}
