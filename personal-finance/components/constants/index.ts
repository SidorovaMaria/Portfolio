import IconBudgets from "../svg/IconBudgets";
import IconOverview from "../svg/IconOverview";
import IconPots from "../svg/IconPots";
import IconRecurringBills from "../svg/IconRecurringBills";
import IconTransactions from "../svg/IconTransactions";

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
