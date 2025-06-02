import { CategoriesType } from "@/components/constants";
import { BudgetType, TransactionType } from "./features/financeSlice";

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

export const calculateMonthlyIncome = (transactions: TransactionType[]): number => {
	const now = new Date();
	const currentMonth = now.getMonth();
	const currentYear = now.getFullYear();

	return transactions
		.filter(
			(t) =>
				t.type === "income" &&
				new Date(t.date).getMonth() === currentMonth &&
				new Date(t.date).getFullYear() === currentYear
		)
		.reduce((sum, t) => sum + t.amount, 0);
};

export const calculateMonthlyExpenses = (transactions: TransactionType[]): number => {
	const now = new Date();
	const currentMonth = now.getMonth();
	const currentYear = now.getFullYear();

	return transactions
		.filter(
			(t) =>
				t.type === "expense" &&
				new Date(t.date).getMonth() === currentMonth &&
				new Date(t.date).getFullYear() === currentYear
		)
		.reduce((sum, t) => sum + t.amount, 0);
};

export const calculateSpendingForBudget = (
	transactions: TransactionType[],
	budgetCategory: BudgetType
) => {
	return transactions
		.filter(
			(t) =>
				t.category.name === budgetCategory.category.name &&
				t.type === "expense" &&
				new Date(t.date).getMonth() === new Date().getMonth() &&
				new Date(t.date).getFullYear() === new Date().getFullYear()
		)
		.reduce((sum, t) => sum + t.amount, 0);
};
export const getLatestTransactionsByCategory = (
	transactions: TransactionType[],
	categoryName: CategoriesType,
	limit: number = 3
) => {
	return transactions
		.filter(
			(t) =>
				t.category.name === categoryName.name &&
				t.type === "expense" &&
				new Date(t.date).getMonth() === new Date().getMonth() &&
				new Date(t.date).getFullYear() === new Date().getFullYear()
		)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.slice(0, limit);
};
