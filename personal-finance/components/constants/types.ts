import { iconMap } from ".";

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
	theme: ThemeType;
	id: string;
};
export type BalanceType = {
	current: number;
	income: number;
	expenses: number;
};
export type NavLink = {
	title: string;
	link: string;
	icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

export type ThemeType = {
	name: string;
	id: string;
	value: string;
};

export type ProfileIconType = {
	iconSrc: string;
	alt: string;
	title: string;
};

export type CurrencyType = {
	code: string;
	name: string;
	symbol: string;
};
export type CategoriesType = {
	name: string;
	icon: keyof typeof iconMap | "";
};
