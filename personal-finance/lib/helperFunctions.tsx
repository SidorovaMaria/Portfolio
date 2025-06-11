import { CategoriesType, TransactionType, BudgetType } from "@/components/constants/types";

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

export const sortRecurringTransactionsByFilter = (
	transactions: TransactionType[],
	filter: string
) => {
	const today = new Date().getDate(); // Current day of the month (1–31)

	const getDay = (dateStr: string) => new Date(dateStr).getDate();

	switch (filter) {
		case "Latest":
			return [...transactions].sort((a, b) => {
				const dayA = getDay(a.date);
				const dayB = getDay(b.date);
				const distA = (dayA - today + 31) % 31;
				const distB = (dayB - today + 31) % 31;
				return distA - distB;
			});

		case "Oldest":
			return [...transactions].sort((a, b) => {
				const dayA = getDay(a.date);
				const dayB = getDay(b.date);
				const distA = (dayA - today + 31) % 31;
				const distB = (dayB - today + 31) % 31;
				return distB - distA;
			});

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

export const categorizeBills = (transactions: TransactionType[]) => {
	const now = new Date();
	const today = now.getDate();
	const dueDay = today + 3;

	const unpaidBills = transactions.filter(
		(transaction) => transaction.reccuring && new Date(transaction.date).getDate() > today
	);

	const paidBills = transactions.filter(
		(transaction) => transaction.reccuring && new Date(transaction.date).getDate() <= today
	);

	const dueSoon = transactions.filter(
		(transaction) =>
			transaction.reccuring &&
			new Date(transaction.date).getDate() <= dueDay &&
			new Date(transaction.date).getDate() > today
	);

	return { unpaidBills, paidBills, dueSoon };
};

export const RecurringStatusTransaction = (transaction: TransactionType) => {
	const now = new Date();
	const today = now.getDate();
	const dueDay = today + 3;
	const transactionDay = new Date(transaction.date).getDate();

	if (transactionDay <= dueDay && transactionDay > today) {
		return "Due Soon";
	} else if (transactionDay > today) {
		return "Unpaid";
	}

	return "Paid";
};
export const filterRecurringTransactionsByCategory = (
	transactions: TransactionType[],
	sort: string
) => {
	return transactions.filter((transaction) => {
		return RecurringStatusTransaction(transaction) === sort || sort === "All Transactions";
	});
};
export const getOrdinal = (n: number) => {
	const mod10 = n % 10;
	const mod100 = n % 100;
	if (mod10 === 1 && mod100 !== 11) return "st";
	if (mod10 === 2 && mod100 !== 12) return "nd";
	if (mod10 === 3 && mod100 !== 13) return "rd";
	return "th";
};

export const getUsedBudgetCategories = (budgets: BudgetType[]) => {
	return budgets.map((budget) => budget.category.name);
};
