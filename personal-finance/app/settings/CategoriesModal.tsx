import { iconMap } from "@/components/constants";
import Modal from "@/components/Modal";
import { RootState } from "@/lib/store";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import CategoryEditDelete from "./CategoryEditDelete";
import CategoryIconPick from "@/components/CategoryIconPick";
import IconWarning from "@/components/svg/IconWarning";
const CategoriesModal = ({ open, close }: { open: boolean; close: () => void }) => {
	const { categories } = useSelector((state: RootState) => state.finance);
	const dispatch = useDispatch();
	const newCategorySchema = Yup.object({
		name: Yup.string().required("Category is required"),
		icon: Yup.mixed<keyof typeof iconMap | "">().required(),
	});
	type NewCategoryType = Yup.InferType<typeof newCategorySchema>;
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
		reset,
	} = useForm<NewCategoryType>({
		resolver: yupResolver(newCategorySchema),
		defaultValues: {
			name: "",
			icon: "",
		},
	});
	const [newCategory, setNewCategory] = useState({
		show: false,
		name: "",
		icon: "",
	});
	const [showIconPicker, setShowIconPicker] = useState(false);
	const Icon = iconMap[watch("icon") as keyof typeof iconMap] || "";
	const AddCategory = (data: NewCategoryType) => {
		dispatch({
			type: "finance/addCategory",
			payload: {
				name: data.name,
				icon: data.icon || "",
			},
		});
		setNewCategory((prev) => ({
			...prev,
			show: false,
			name: "",
			icon: "",
		}));
		reset();
	};

	return (
		<Modal open={open} close={close}>
			<div className="flex flex-col w-full gap-3">
				<h2 className="text-2 leading-120 font-bold w-full">Manage Categories</h2>
				<p className="text-5 leading-150 text-grey-500 w-full">
					Here you can add new categories, rename existing ones, or delete the ones you no
					longer need.
					<br /> Deleting a category will remove it from all transactions that used it.
					Any associated budget for that category will also be deleted.
					<br /> The &quot;Other&quot; category is permanent and cannot be deleted, as
					it&apos;s used for uncategorized or fallback transactions.
				</p>
			</div>
			<div className=" flex items-center p-0 w-full">
				{newCategory.show ? (
					<form
						onSubmit={handleSubmit(AddCategory)}
						className="settings-option  group flex items-center py-1 w-full"
					>
						<div
							className="relative"
							onClick={() => setShowIconPicker(!showIconPicker)}
						>
							{Icon ? <Icon /> : <div className="size-8 rounded-full border  "></div>}
							<CategoryIconPick
								open={showIconPicker}
								setIcon={(i: keyof typeof iconMap) => setValue("icon", i)}
							/>
						</div>
						<div className="text-3 leading-150 text-grey-900 border border-transparent bg-white rounded-md p-1 px-2 transition-all duration-200 has-focus:border-grey-900 w-full flex-between">
							<input
								type="text"
								placeholder="Category Name"
								className="outline-none flex-1 w-full"
								{...register("name")}
							/>
							{errors.name && (
								<p className="error-message">
									<IconWarning className="inline-flex  fill-red-500" />
									{errors.name.message}
								</p>
							)}
						</div>
						<button type="submit">Add </button>
						<button
							type="button"
							onClick={() => {
								setNewCategory((prev) => ({
									...prev,
									show: false,
									name: "",
									icon: "",
								}));
								reset();
								console.log("Cancel adding category");
							}}
						>
							Cancel
						</button>
					</form>
				) : (
					<button
						onClick={() =>
							setNewCategory((prev) => ({
								...prev,
								show: true,
								name: "",
								icon: "",
							}))
						}
						className="btn btn-secondary w-full py-2"
					>
						+ Add Category{" "}
					</button>
				)}
			</div>

			<div className="flex flex-col gap-1 w-full p-0.5 max-h-[40vh] overflow-y-auto">
				{categories.length > 0
					? categories.map((category) => (
							<CategoryEditDelete key={category.name} category={category} />
					  ))
					: null}
			</div>
		</Modal>
	);
};

export default CategoriesModal;
