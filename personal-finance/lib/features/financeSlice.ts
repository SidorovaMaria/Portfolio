import {
	CategoriesType,
	defaultCategories,
	defaultTransactions,
	ThemeType,
} from "@/components/constants";
import { createSlice } from "@reduxjs/toolkit";
import { calculateMonthlyExpenses, calculateMonthlyIncome } from "../helperFunctions";

export type TransactionType = {
	title: string;
	category: CategoriesType;
	date: string;
	amount: number;
	type: "income" | "expense";
	reccuring: boolean;
	id: string;
};
export type BudgetType = {
	category: CategoriesType;
	maximum: number;
	theme: ThemeType;
	id: string;
};

export type PotType = {
	name: string;
	target: number;
	total: number;
	theme: { id: string; name: string; value: string };
	id: string;
};
export type BalanceType = {
	current: number;
	income: number;
	expenses: number;
};
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
			category: { name: "Food", icon: "Apple" },
			maximum: 400,
			theme: {
				name: "Blue",
				id: "blue",
				value: "#3F82B2",
			},
			id: "34",
		},
		{
			category: { name: "Transport", icon: "Bus" },
			maximum: 100,
			theme: {
				name: "Green",
				id: "green",
				value: "#4CAF50",
			},
			id: "340",
		},
		{
			category: { name: "Entertainment", icon: "Theater" },
			maximum: 200,
			theme: {
				name: "Magenta",
				id: "magenta",
				value: "#934F6F",
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
		{
			category: { name: "Utilities", icon: "Lightbulb" },
			maximum: 300,
			theme: {
				name: "Yellow",
				id: "yellow",
				value: "#FFD700",
			},
			id: "343",
		},
		{
			category: { name: "Education", icon: "Book" },
			maximum: 250,
			theme: {
				name: "Purple",
				id: "purple",
				value: "#800080",
			},
			id: "344",
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
		addPot: (state, action) => {
			const { name, target, theme } = action.payload;
			const newPot: PotType = {
				name,
				target,
				total: 0,
				theme,
				id: new Date().getTime().toString(),
			};
			state.pots.push(newPot);
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
			} else {
				console.warn(`Pot with id ${potId} not found for editing.`);
			}
		},
		deletePot: (state, action) => {
			const potId = action.payload;
			state.pots = state.pots.filter((pot) => pot.id !== potId);
			console.log(`Pot with id ${potId} deleted.`);
		},
		addMoneyToPot: (state, action) => {
			const { potId, amount } = action.payload;
			const pot = state.pots.find((p) => p.id === potId);
			if (pot) {
				pot.total += amount;
				state.balance.current -= amount; // Update current balance
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
		addTransaction: (state, action) => {
			const newTransaction: TransactionType = {
				...action.payload,
				id: new Date().getTime().toString(),
			};
			state.transactions.push(newTransaction);
			if (newTransaction.type === "income") {
				state.balance.current += newTransaction.amount;
			} else if (newTransaction.type === "expense") {
				state.balance.current -= newTransaction.amount;
			}
			state.balance.income = calculateMonthlyIncome(state.transactions);
			state.balance.expenses = calculateMonthlyExpenses(state.transactions);
		},
		editTransaction: (state, action) => {
			const { id, title, category, date, amount, type, reccuring } = action.payload;
			const transactionIndex = state.transactions.findIndex((t) => t.id === id);
			if (transactionIndex !== -1) {
				const oldTransaction = state.transactions[transactionIndex];
				const oldAmount = oldTransaction.amount;
				const oldType = oldTransaction.type;
				state.transactions[transactionIndex] = {
					id,
					title,
					category,
					date: date,
					amount,
					type,
					reccuring,
				};
				//Rmove old amount from balance
				if (oldType === "income") {
					state.balance.current -= oldAmount;
				} else if (oldType === "expense") {
					state.balance.current += oldAmount;
				}
				//Add new amount to balance
				if (type === "income") {
					state.balance.current += amount;
				} else if (type === "expense") {
					state.balance.current -= amount;
				}
				state.balance.income = calculateMonthlyIncome(state.transactions);
				state.balance.expenses = calculateMonthlyExpenses(state.transactions);
			}
		},
		deleteTransaction: (state, action) => {
			const transactionId = action.payload;
			const transactionIndex = state.transactions.findIndex((t) => t.id === transactionId);
			if (transactionIndex !== -1) {
				const transaction = state.transactions[transactionIndex];
				// Adjust balance based on transaction type
				if (transaction.type === "income") {
					state.balance.current -= transaction.amount;
				} else if (transaction.type === "expense") {
					state.balance.current += transaction.amount;
				}
				// Remove the transaction from the list
				state.transactions.splice(transactionIndex, 1);
				state.balance.income = calculateMonthlyIncome(state.transactions);
				state.balance.expenses = calculateMonthlyExpenses(state.transactions);
			}
		},
		addBudget: (state, action) => {
			const { category, maximum, theme } = action.payload;
			const newBudget: BudgetType = {
				category,
				maximum,
				theme,
				id: new Date().getTime().toString(),
			};
			state.budgets.push(newBudget);
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
			} else {
				console.warn(`Budget with id ${budgetId} not found for editing.`);
			}
		},
		deleteBudget: (state, action) => {
			const budgetId = action.payload;
			state.budgets = state.budgets.filter((budget) => budget.id !== budgetId);
			console.log(`Budget with id ${budgetId} deleted.`);
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
} = financeSlice.actions;
export const financeReducer = financeSlice.reducer;
