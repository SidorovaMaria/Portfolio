"use client";
import SpendingSummary from "@/components/budgets/SpendingSummary";
import Title from "@/components/Title";
import { useState } from "react";
import { BudgetType } from "@/components/constants/types";

import AddEditBudget from "@/components/modals/AddEditBudget";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Budget from "@/components/budgets/Budget";
import { Plus } from "lucide-react";

export default function Budgets() {
	const { budgets } = useSelector((state: RootState) => state.finance);
	const [addEditBudgetModal, setAddEditBudgetModal] = useState<{
		open: boolean;
		mode: string;
		budgetToEdit: BudgetType | null;
	}>({
		open: false,
		mode: "",
		budgetToEdit: null,
	});
	const setBudgetToEdit = (budget: BudgetType | null) => {
		setAddEditBudgetModal((prev) => ({
			...prev,
			open: true,
			mode: "edit",
			budgetToEdit: budget,
		}));
	};

	return (
		<>
			<Title
				title={`Budgets`}
				period={new Date().toLocaleString("default", {
					month: "long",
					year: "numeric",
				})}
				btn={true}
				btnText="Add New Budget"
				onClick={() =>
					setAddEditBudgetModal((prev) => ({
						...prev,
						open: true,
						mode: "add",
						budgetToEdit: null,
					}))
				}
			>
				<Plus className="w-5 h-5 stroke-[4px] fill-fg" />
			</Title>
			<section className=" gap-6 w-full ovefllow-y-auto grid grid-cols-1 lg:grid-cols-2 max-h-[calc(100vh-17vh)] ">
				<SpendingSummary />
				<section className="flex flex-col gap-6 w-full overflow-auto lg:max-h-[calc(100vh-15vh)] lg:px-4">
					{budgets.length > 0
						? budgets.map((budget) => (
								<Budget
									budget={budget}
									key={budget.id}
									editBudget={() => setBudgetToEdit(budget)}
								/>
						  ))
						: null}
				</section>
			</section>

			<AddEditBudget
				mode={addEditBudgetModal.mode}
				open={addEditBudgetModal.open}
				close={() =>
					setAddEditBudgetModal((prev) => ({
						...prev,
						open: false,
						mode: "",
						budgetToEdit: null,
					}))
				}
				budget={addEditBudgetModal.budgetToEdit}
			/>
		</>
	);
}
