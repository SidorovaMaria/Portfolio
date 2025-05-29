import IconBudgets from "../svg/IconBudgets";
import IconOverview from "../svg/IconOverview";
import IconPots from "../svg/IconPots";
import IconRecurringBills from "../svg/IconRecurringBills";
import IconTransactions from "../svg/IconTransactions";
import {
	Activity,
	Apple,
	Asterisk,
	Bus,
	HeartPlus,
	LucideIcon,
	Theater,
	Wallet,
} from "lucide-react";

export type NavLink = {
	title: string;
	link: string;
	icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

export const navlinks: NavLink[] = [
	{
		title: "Overview",
		link: "/",
		icon: IconOverview,
	},
	{
		title: "Transactions",
		link: "/transactions",
		icon: IconTransactions,
	},
	{
		title: "Budgets",
		link: "/budgets",
		icon: IconBudgets,
	},
	{
		title: "Pots",
		link: "/pots",
		icon: IconPots,
	},
	{
		title: "Recurring bills",
		link: "/recurring-bills",
		icon: IconRecurringBills,
	},
];
type ThemeType = {
	name: string;
	id: string;
	value: string;
};

export const Themes: ThemeType[] = [
	{
		name: "Green",
		id: "green",
		value: "#277C78",
	},
	{
		name: "Yellow",
		id: "yellow",
		value: "#F2CDAC",
	},
	{
		name: "Cyan",
		id: "cyan",
		value: "#82C9D7",
	},
	{
		name: "Navy",
		id: "navy",
		value: "#626070",
	},
	{
		name: "Red",
		id: "red",
		value: "#C94736",
	},
	{
		name: "Purple",
		id: "purple",
		value: "#826CB0",
	},
	{
		name: "Light Purple",
		id: "light-purple",
		value: "#AF81BA",
	},
	{
		name: "Turquoise",
		id: "turquoise",
		value: "#597C7C",
	},
	{
		name: "Brown",
		id: "brown",
		value: "#93674F",
	},
	{
		name: "Magenta",
		id: "magenta",
		value: "#934F6F",
	},
	{
		name: "Sky Blue",
		id: "sky-blue",
		value: "#3F82B2",
	},
	{
		name: "Navy Grey",
		id: "navy-grey",
		value: "#97A0AC",
	},
	{
		name: "Army Green",
		id: "army-green",
		value: "#7F9161",
	},
	{
		name: "Gold",
		id: "gold",
		value: "#CAB361",
	},
	{
		name: "Orange",
		id: "orange",
		value: "#BE6C49",
	},
];

export type CategoriesType = {
	name: string;
	icon: LucideIcon;
};

export const defaultCategories: CategoriesType[] = [
	{ name: "Food", icon: Apple },
	{ name: "Transport", icon: Bus },
	{ name: "Entertainment", icon: Theater },
	{ name: "Health", icon: Activity },
	{ name: "Shopping", icon: HeartPlus },
	{ name: "Bills", icon: Wallet },
	{ name: "Other", icon: Asterisk },
];
