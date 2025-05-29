import IconBudgets from "../svg/IconBudgets";
import IconOverview from "../svg/IconOverview";
import IconPots from "../svg/IconPots";
import IconRecurringBills from "../svg/IconRecurringBills";
import IconTransactions from "../svg/IconTransactions";
import { TransactionType } from "../../lib/features/financeSlice";
import { Activity, Apple, Asterisk, Bus, HeartPlus, Theater, Wallet } from "lucide-react";

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

export const iconMap = {
	Apple,
	Bus,
	Theater,
	Activity,
	HeartPlus,
	Wallet,
	Asterisk,
};

export type CategoriesType = {
	name: string;
	icon: keyof typeof iconMap;
};

export const defaultCategories: CategoriesType[] = [
	{ name: "Food", icon: "Apple" },
	{ name: "Transport", icon: "Bus" },
	{ name: "Entertainment", icon: "Theater" },
	{ name: "Health", icon: "Activity" },
	{ name: "Shopping", icon: "HeartPlus" },
	{ name: "Bills", icon: "Wallet" },
	{ name: "Other", icon: "Asterisk" },
];

export const defaultTransactions: TransactionType[] = [
	{
		title: "Grocery Shopping",
		category: { name: "Food", icon: "Apple" },
		date: new Date("2025-10-01").toISOString(),
		amount: 150.75,
		type: "expense",
		reccuring: false,
		id: "grocery-shopping-1",
	},
	{
		title: "Salary",
		category: { name: "Income", icon: "Wallet" },
		date: new Date("2025-10-01").toISOString(),
		amount: 3000,
		type: "income",
		reccuring: true,
		id: "salary-1",
	},
	{
		title: "Bus Ticket",
		category: { name: "Transport", icon: "Bus" },
		date: new Date("2025-10-02").toISOString(),
		amount: 2.5,
		type: "expense",
		reccuring: false,
		id: "bus-ticket-1",
	},
	{
		title: "Movie Night",
		category: { name: "Entertainment", icon: "Theater" },
		date: new Date("2025-10-03").toISOString(),
		amount: 12.99,
		type: "expense",
		reccuring: false,
		id: "movie-night-1",
	},
	{
		title: "Gym Membership",
		category: { name: "Health", icon: "Activity" },
		date: new Date("2025-10-04").toISOString(),
		amount: 50,
		type: "expense",
		reccuring: true,
		id: "gym-membership-1",
	},
	{
		title: "Online Shopping",
		category: { name: "Shopping", icon: "HeartPlus" },
		date: new Date("2025-10-05").toISOString(),
		amount: 120.45,
		type: "expense",
		reccuring: false,
		id: "online-shopping-1",
	},
	{
		title: "Electricity Bill",
		category: { name: "Bills", icon: "Wallet" },
		date: new Date("2025-10-06").toISOString(),
		amount: 75.89,
		type: "expense",
		reccuring: true,
		id: "electricity-bill-1",
	},
	{
		title: "Concert Tickets",
		category: { name: "Entertainment", icon: "Theater" },
		date: new Date("2025-10-07").toISOString(),
		amount: 200,
		type: "expense",
		reccuring: false,
		id: "concert-tickets-1",
	},
	{
		title: "Coffee with Friends",
		category: { name: "Food", icon: "Apple" },
		date: new Date("2025-10-08").toISOString(),
		amount: 15.25,
		type: "expense",
		reccuring: false,
		id: "coffee-with-friends-1",
	},
	{
		title: "Car Maintenance",
		category: { name: "Transport", icon: "Bus" },
		date: new Date("2025-10-09").toISOString(),
		amount: 300,
		type: "expense",
		reccuring: false,
		id: "car-maintenance-1",
	},
	{
		title: "Freelance Project",
		category: { name: "Income", icon: "Wallet" },
		date: new Date("2025-10-10").toISOString(),
		amount: 500,
		type: "income",
		reccuring: false,
		id: "freelance-project-1",
	},
	{
		title: "Pharmacy Purchase",
		category: { name: "Health", icon: "Activity" },
		date: new Date("2025-10-11").toISOString(),
		amount: 25.5,
		type: "expense",
		reccuring: false,
		id: "pharmacy-purchase-1",
	},
	{
		title: "Streaming Subscription",
		category: { name: "Entertainment", icon: "Theater" },
		date: new Date("2025-10-12").toISOString(),
		amount: 9.99,
		type: "expense",
		reccuring: true,
		id: "streaming-subscription-1",
	},
	{
		title: "Lunch at Restaurant",
		category: { name: "Food", icon: "Apple" },
		date: new Date("2025-10-13").toISOString(),
		amount: 45.75,
		type: "expense",
		reccuring: false,
		id: "lunch-at-restaurant-1",
	},
	{
		title: "Clothing Purchase",
		category: { name: "Shopping", icon: "HeartPlus" },
		date: new Date("2025-10-14").toISOString(),
		amount: 150,
		type: "expense",
		reccuring: false,
		id: "clothing-purchase-1",
	},
	{
		title: "Water Bill",
		category: { name: "Bills", icon: "Wallet" },
		date: new Date("2025-10-15").toISOString(),
		amount: 30.25,
		type: "expense",
		reccuring: true,
		id: "water-bill-1",
	},
	{
		title: "Book Purchase",
		category: { name: "Entertainment", icon: "Theater" },
		date: new Date("2025-10-16").toISOString(),
		amount: 20,
		type: "expense",
		reccuring: false,
		id: "book-purchase-1",
	},
	{
		title: "Dinner with Family",
		category: { name: "Food", icon: "Apple" },
		date: new Date("2025-10-17").toISOString(),
		amount: 80,
		type: "expense",
		reccuring: false,
		id: "dinner-with-family-1",
	},
	{
		title: "Pet Supplies",
		category: { name: "Shopping", icon: "HeartPlus" },
		date: new Date("2025-10-18").toISOString(),
		amount: 60.5,
		type: "expense",
		reccuring: false,
		id: "pet-supplies-1",
	},
	{
		title: "Internet Bill",
		category: { name: "Bills", icon: "Wallet" },
		date: new Date("2025-10-19").toISOString(),
		amount: 50,
		type: "expense",
		reccuring: true,
		id: "internet-bill-1",
	},
	{
		title: "Yoga Class",
		category: { name: "Health", icon: "Activity" },
		date: new Date("2025-10-20").toISOString(),
		amount: 25,
		type: "expense",
		reccuring: false,
		id: "yoga-class-1",
	},
];
