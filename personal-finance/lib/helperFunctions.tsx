import { TransactionType } from "./features/financeSlice";

export const toLocaleStringWithCommas = (num: number, currency: string, afterComa: number = 2) => {
	return num.toLocaleString("en-US", {
		minimumFractionDigits: afterComa,
		maximumFractionDigits: afterComa,
		style: "currency",
		currency: currency,
	});
};

export const sortTransactionsByFilter = (transactions: TransactionType[], filter: string) => {
	switch (filter) {
		case "Latest":
			return [...transactions].sort(
				(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
			);
		case "Oldest":
			return [...transactions].sort(
				(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
			);
		case "A to Z":
			return [...transactions].sort((a, b) => a.title.localeCompare(b.title));
		case "Z to A":
			return [...transactions].sort((a, b) => b.title.localeCompare(a.title));
		case "Highest":
			return [...transactions].sort((a, b) => b.amount - a.amount);
		case "Lowest":
			return [...transactions].sort((a, b) => a.amount - b.amount);
		default:
			return transactions;
	}
};
