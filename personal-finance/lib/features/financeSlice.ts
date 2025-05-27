import { createSlice } from "@reduxjs/toolkit";

export type TransactionType = {
	// avatar: string;
	// name: string;
	category: "string";
	date: "string";
	amount: number;
	reccuring: boolean;
	id: string;
};
export type BudgetType = {
	category: string;
	maximum: number;
	theme: string;
	id: string;
};
export type PotType = {
	name: string;
	target: number;
	total: number;
	theme: string;
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
}
const initialState = {
	transactions: [],
	budgets: [],
	pots: [{ name: "Vacation", target: 2000, total: 159, theme: "#FF5733", id: "1" }],
	balance: {
		current: 4836,
		income: 3814.25,
		expenses: 1700.5,
	},
	currency: "USD",
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
	},
});
export const { addPot, addMoneyToPot, withdrawMoneyFromPot } = financeSlice.actions;
export const financeReducer = financeSlice.reducer;
