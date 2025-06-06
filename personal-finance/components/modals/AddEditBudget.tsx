import React, { useEffect } from "react";
import { iconMap, Themes } from "../constants";
import * as Yup from "yup";
import { BudgetType } from "@/lib/features/financeSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import ModalDropDown from "./ModalDropDown";
import { RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import IconWarning from "../svg/IconWarning";
import Modal from "../Modal";
interface AddEditBudgetProps {
	mode: string;
	open: boolean;
	close: () => void;
	budget: BudgetType | null;
}
const AddEditBudget = ({ mode, open, close, budget }: AddEditBudgetProps) => {
	const { categories, currency, budgets } = useSelector((state: RootState) => state.finance);

	const budgetSchema = Yup.object({
		category: Yup.object({
			name: Yup.string().required("Category name is required"),
			icon: Yup.mixed<keyof typeof iconMap | "">().required("Category icon is required"),
		})
			.required("Category is required")
			.test(
				"theme-not-placeholder",
				"Please choose a category",
				(value) => value?.name !== "Choose Category"
			)
			.test("unique-budget", "Budget for this already exists", function (value) {
				const existingBudget = budgets.find((b) => b.category.name === value?.name);

				if (existingBudget && mode === "add") {
					return false;
				}
				return true;
			}),
		//TODO CAN Not add Same catgory type
		maximum: Yup.number()
			.typeError("Must be a number")
			.positive("Must be a positive number")
			.required("Maximum is required"),
		theme: Yup.object({
			id: Yup.string().required("Theme ID is required"),
			name: Yup.string().required("Theme name is required"),
			value: Yup.string().required("Theme value is required"),
		})
			.required("Theme is required")
			.test(
				"theme-not-placeholder",
				"Please choose a theme",
				(value) => value?.id !== "1" //'1' is the placeholder ID for "Choose Theme"
			),
	});
	type BudgetFormData = Yup.InferType<typeof budgetSchema>;
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
		watch,
	} = useForm<BudgetFormData>({
		resolver: yupResolver(budgetSchema),
		defaultValues: {
			category:
				mode === "edit" && budget
					? budget.category
					: {
							name: "Choose Category",
							icon: "",
					  },
			maximum: mode === "edit" && budget ? budget.maximum : 0,
			theme:
				mode === "edit" && budget
					? budget.theme
					: { id: "1", name: "Choose Theme", value: "#000000" },
		},
	});
	const closeResetModal = () => {
		close();
		reset();
	};
	const dispatch = useDispatch();
	const handleSubmitBudget = (data: BudgetFormData) => {
		if (mode === "add") {
			dispatch({
				type: "finance/addBudget",
				payload: {
					category: data.category,
					maximum: data.maximum,
					theme: data.theme,
				},
			});
		} else if (mode === "edit" && budget) {
			dispatch({
				type: "finance/editBudget",
				payload: {
					budgetId: budget.id,
					category: data.category,
					maximum: data.maximum,
					theme: data.theme,
				},
			});
		}
		closeResetModal();
	};
	useEffect(() => {
		if (mode === "edit" && budget) {
			reset({
				category: budget.category,
				maximum: budget.maximum,
				theme: budget.theme,
			});
		} else if (mode === "add") {
			reset({
				category: {
					name: "Choose Category",
					icon: "",
				},
				maximum: 0,
				theme: { id: "1", name: "Choose Theme", value: "#000000" },
			});
		}
	}, [mode, budget, reset]);

	return (
		<Modal
			close={closeResetModal}
			open={open}
			title={mode === "add" ? "Add New Budget" : "Edit Budget"}
		>
			<p className="text-p4 w-full text-muted">
				{mode == "add"
					? "Choose a category to set a spending budget. These categories can help you monitor spending."
					: "As your budgets change, feel free to update your spending limits."}
			</p>
			<form
				id="budgetForm"
				onSubmit={handleSubmit(handleSubmitBudget)}
				className="flex flex-col gap-4 w-full"
			>
				<ModalDropDown
					error={errors.category?.message}
					optionType="categories"
					label="Budget Category"
					options={categories}
					disabled={mode === "edit" ? true : false}
					selected={watch("category")}
					setSelected={(category) =>
						setValue(
							"category",
							category as {
								name: string;
								icon: keyof typeof iconMap;
							}
						)
					}
				/>
				<div className="flex-column gap-1 ">
					<div className="flex-between">
						<label htmlFor="maximum" className="text-p5-bold text-muted">
							Maximum Spend
						</label>
						{errors.maximum && (
							<p className="error-message ">
								<IconWarning className="inline-flex fill-red-500 " />

								{errors.maximum.message}
							</p>
						)}
					</div>
					<div className="input-container">
						<span className="text-border dark:text-muted-alt">{currency}</span>
						<input
							type="number"
							id="maximum"
							className="outline-none flex-1 w-full"
							{...register("maximum")}
						/>
					</div>
				</div>
				<ModalDropDown
					error={errors.theme?.message}
					optionType="themes"
					label="Theme"
					options={Themes}
					selected={watch("theme")}
					setSelected={(theme) =>
						setValue(
							"theme",
							theme as {
								id: string;
								name: string;
								value: string;
							}
						)
					}
				/>
			</form>
			<button className="btn btn-primary w-full" type="submit" form="budgetForm">
				{mode === "add" ? "Add Budget" : "Save Changes"}
			</button>
		</Modal>
	);
};

export default AddEditBudget;
