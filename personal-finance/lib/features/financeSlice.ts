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
}
const initialState = {
	transactions: [],
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
	},
});
export const { addPot, addMoneyToPot, withdrawMoneyFromPot, editPot, deletePot } =
	financeSlice.actions;
export const financeReducer = financeSlice.reducer;
