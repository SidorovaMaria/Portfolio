import { createSlice } from "@reduxjs/toolkit";
import { calculateMonthlyExpenses, calculateMonthlyIncome } from "../helperFunctions";
import {
	BalanceType,
	BudgetType,
	CategoriesType,
	PotType,
	TransactionType,
} from "@/components/constants/types";
import { defaultCategories, defaultTransactions } from "@/components/constants";

interface FinanceState {
	transactions: TransactionType[];
	budgets: BudgetType[];
	pots: PotType[];
	balance: BalanceType;
	currency: string;
	categories: CategoriesType[];
}

const initialState = {
	transactions: defaultTransactions,
	budgets: [
		{
			category: { name: "Bills", icon: "Wallet" },
			maximum: 400,
			theme: {
				name: "Navy",
				id: "navy",
				value: "#626070",
			},
			id: "34",
		},
		{
			category: { name: "Transport", icon: "Bus" },
			maximum: 100,
			theme: {
				name: "Yellow",
				id: "yellow",
				value: "#F2CDAC",
			},
			id: "340",
		},
		{
			category: { name: "Entertainment", icon: "Theater" },
			maximum: 200,
			theme: {
				name: "Green",
				id: "green",
				value: "#277C78",
			},
			id: "341",
		},
		{
			category: { name: "Health", icon: "Activity" },
			maximum: 150,
			theme: {
				name: "Cyan",
				id: "cyan",
				value: "#00BCD4",
			},
			id: "342",
		},
	],
	pots: [
		{
			name: "Vacation",
			target: 2000,
			total: 159,
			theme: {
				name: "Magenta",
				id: "magenta",
				value: "#934F6F",
			},
			id: "1",
		},
		{
			name: "Emergency Fund",
			target: 5000,
			total: 1200,
			theme: {
				name: "Green",
				id: "green",
				value: "#4CAF50",
			},
			id: "2",
		},
		{
			name: "New Car",
			target: 15000,
			total: 3000,
			theme: {
				name: "Blue",
				id: "blue",
				value: "#3F82B2",
			},
			id: "3",
		},
		{
			name: "Wedding",
			target: 10000,
			total: 2500,
			theme: {
				name: "Purple",
				id: "purple",
				value: "#800080",
			},
			id: "4",
		},
		{
			name: "Home Renovation",
			target: 15000,
			total: 5000,
			theme: {
				name: "Orange",
				id: "orange",
				value: "#FFA500",
			},
			id: "5",
		},
		{
			name: "Education Fund",
			target: 20000,
			total: 8000,
			theme: {
				name: "Yellow",
				id: "yellow",
				value: "#FFD700",
			},
			id: "6",
		},
	],
	balance: {
		current: 4836.0,
		income: calculateMonthlyIncome(defaultTransactions),
		expenses: calculateMonthlyExpenses(defaultTransactions),
	},

	currency: "GBP",
	categories: defaultCategories,
} as FinanceState;

const financeSlice = createSlice({
	name: "finance",
	initialState,
	reducers: {
		// Pots
		addPot: (state, action) => {
			const { name, target, theme } = action.payload;
			// Check if a pot with the same name already exists
			// const existingPot = state.pots.find((pot) => pot.name === name);
			// if (existingPot) {
			// 	console.warn(`Pot with name ${name} already exists.`);
			// 	return; // Prevent adding a duplicate pot
			// }
			state.pots.unshift({
				name,
				target,
				total: 0,
				theme,
				id: new Date().getTime().toString(),
			});
		},
		editPot: (state, action) => {
			const { potId, name, target, theme } = action.payload;
			const potIndex = state.pots.findIndex((p) => p.id === potId);

			if (potIndex !== -1) {
				state.pots[potIndex] = {
					...state.pots[potIndex],
					name,
					target,
					theme,
				};
			}
		},
		deletePot: (state, action) => {
			state.pots = state.pots.filter((pot) => pot.id !== action.payload);
		},
		addMoneyToPot: (state, action) => {
			const { potId, amount } = action.payload;
			const pot = state.pots.find((p) => p.id === potId);
			if (pot) {
				pot.total += amount;
				state.balance.current -= amount;
			}
		},
		withdrawMoneyFromPot: (state, action) => {
			const { potId, amount } = action.payload;
			const pot = state.pots.find((p) => p.id === potId);
			if (pot) {
				pot.total = Math.max(0, pot.total - amount); // Ensure total doesn't go negative
				state.balance.current += amount; // Update current balance
			}
		},
		// Transactions
		addTransaction: (state, action) => {
			const newTransaction: TransactionType = {
				...action.payload,
				id: new Date().getTime().toString(),
			};
			state.transactions.push(newTransaction);
			state.balance.current +=
				newTransaction.type === "income" ? newTransaction.amount : -newTransaction.amount;
			state.balance.income = calculateMonthlyIncome(state.transactions);
			state.balance.expenses = calculateMonthlyExpenses(state.transactions);
		},
		editTransaction: (state, action) => {
			const { id, amount } = action.payload;
			const index = state.transactions.findIndex((t) => t.id === id);
			if (index !== -1) {
				const old = state.transactions[index];
				//Rmove old amount from balance
				state.balance.current += old.type === "income" ? -old.amount : old.amount;
				//Add new amount to balance
				state.balance.current += action.payload.type === "income" ? amount : -amount;
				state.transactions[index] = action.payload;
				state.balance.income = calculateMonthlyIncome(state.transactions);
				state.balance.expenses = calculateMonthlyExpenses(state.transactions);
			}
		},
		deleteTransaction: (state, action) => {
			const transactionId = action.payload;
			const index = state.transactions.findIndex((t) => t.id === transactionId);

			if (index !== -1) {
				const transaction = state.transactions[index];
				// Adjust balance based on transaction type
				state.balance.current +=
					transaction.type === "income" ? -transaction.amount : transaction.amount;
				// Remove the transaction from the list
				state.transactions.splice(index, 1);
				// Recalculate expenses and income
				state.balance.income = calculateMonthlyIncome(state.transactions);
				state.balance.expenses = calculateMonthlyExpenses(state.transactions);
			}
		},
		// Budgets
		addBudget: (state, action) => {
			state.budgets.unshift({ ...action.payload, id: Date.now().toString() });
		},
		editBudget: (state, action) => {
			const { budgetId, category, maximum, theme } = action.payload;
			const budgetIndex = state.budgets.findIndex((b) => b.id === budgetId);

			if (budgetIndex !== -1) {
				state.budgets[budgetIndex] = {
					...state.budgets[budgetIndex],
					category,
					maximum,
					theme,
				};
			}
		},
		deleteBudget: (state, action) => {
			state.budgets = state.budgets.filter((budget) => budget.id !== action.payload.budgetId);
		},
		// Categories
		addCategory: (state, action) => {
			state.categories.unshift(action.payload);
		},
		updateCategory: (state, action) => {
			const { oldCategory, newCategory } = action.payload;
			// Update category in categories
			state.categories = state.categories.map((category) =>
				category.name === oldCategory.name && category.icon === oldCategory.icon
					? newCategory
					: category
			);
			// Update category in budgets
			state.budgets = state.budgets.map((b) =>
				b.category.name === oldCategory.name && b.category.icon === oldCategory.icon
					? { ...b, category: newCategory }
					: b
			);
			// Update category in transactions
			state.transactions = state.transactions.map((t) =>
				t.category.name === oldCategory.name && t.category.icon === oldCategory.icon
					? { ...t, category: newCategory }
					: t
			);
		},
		deleteCategory: (state, action) => {
			const categoryToDelete = action.payload;
			state.categories = state.categories.filter(
				(c) => c.name !== categoryToDelete.name || c.icon !== categoryToDelete.icon
			);
			// Remove category from budgets
			state.budgets = state.budgets.filter(
				(b) =>
					b.category.name !== categoryToDelete.name ||
					b.category.icon !== categoryToDelete.icon
			);
			// Remove category from transactions
			state.transactions = state.transactions.map((t) =>
				t.category.name === categoryToDelete.name &&
				t.category.icon === categoryToDelete.icon
					? { ...t, category: { name: "Other", icon: "" } }
					: t
			);
		},
		// Currency
		setCurrency: (state, action) => {
			state.currency = action.payload;
		},
	},
});
export const {
	addPot,
	addMoneyToPot,
	withdrawMoneyFromPot,
	editPot,
	deletePot,
	addTransaction,
	editTransaction,
	deleteTransaction,
	addBudget,
	editBudget,
	deleteBudget,
	updateCategory,
	addCategory,
	deleteCategory,
	setCurrency,
} = financeSlice.actions;
export const financeReducer = financeSlice.reducer;
