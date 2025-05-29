import { CategoriesType, defaultCategories, defaultTransactions } from "@/components/constants";
import { createSlice } from "@reduxjs/toolkit";

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
	category: string;
	maximum: number;
	theme: { id: number; name: string; value: string };
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
	budgets: [],
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
	],
	balance: {
		current: 4836.0,
		income: 3814.25,
		expenses: 1700.5,
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
				state.balance.income += newTransaction.amount;
				state.balance.current += newTransaction.amount;
			} else if (newTransaction.type === "expense") {
				state.balance.expenses += newTransaction.amount;
				state.balance.current -= newTransaction.amount;
			}
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
					state.balance.income -= oldAmount;
					state.balance.current -= oldAmount;
				} else if (oldType === "expense") {
					state.balance.expenses -= oldAmount;
					state.balance.current += oldAmount;
				}
				//Add new amount to balance
				if (type === "income") {
					state.balance.income += amount;
					state.balance.current += amount;
				} else if (type === "expense") {
					state.balance.expenses += amount;
					state.balance.current -= amount;
				}
			}
		},
		deleteTransaction: (state, action) => {
			const transactionId = action.payload;
			const transactionIndex = state.transactions.findIndex((t) => t.id === transactionId);
			if (transactionIndex !== -1) {
				const transaction = state.transactions[transactionIndex];
				// Adjust balance based on transaction type
				if (transaction.type === "income") {
					state.balance.income -= transaction.amount;
					state.balance.current -= transaction.amount;
				} else if (transaction.type === "expense") {
					state.balance.expenses -= transaction.amount;
					state.balance.current += transaction.amount;
				}
				// Remove the transaction from the list
				state.transactions.splice(transactionIndex, 1);
			}
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
} = financeSlice.actions;
export const financeReducer = financeSlice.reducer;
