import { iconMap } from "@/components/constants";
import Modal from "@/components/Modal";
import { RootState } from "@/lib/store";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import CategoryEditDelete from "./CategoryEditDelete";
import CategoryIconPick from "@/components/CategoryIconPick";
import IconWarning from "@/components/svg/IconWarning";

//CategoriesSchema

const CategoriesModal = ({ open, close }: { open: boolean; close: () => void }) => {
	const { categories } = useSelector((state: RootState) => state.finance);
	const dispatch = useDispatch();

	const schema = Yup.object({
		name: Yup.string()
			.required("Category is required")
			.test("unique", "Category already exists", (value) => {
				return !categories.some((cat) => cat.name.toLowerCase() === value?.toLowerCase());
			}),
		icon: Yup.mixed<keyof typeof iconMap | "">().required(),
	});
	type CategoryForm = Yup.InferType<typeof schema>;

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
		reset,
	} = useForm<CategoryForm>({
		resolver: yupResolver(schema),
		defaultValues: {
			name: "",
			icon: "",
		},
	});
	const [isAdding, setIsAdding] = useState(false);
	const [showIconPicker, setShowIconPicker] = useState(false);
	const Icon = iconMap[watch("icon") as keyof typeof iconMap];

	const onSubmit = useCallback(
		(data: CategoryForm) => {
			dispatch({
				type: "finance/addCategory",
				payload: {
					name: data.name,
					icon: data.icon,
				},
			});
			setIsAdding(false);
			setShowIconPicker(false);
			reset();
		},
		[dispatch, reset]
	);
	return (
		<Modal open={open} close={close} title="Manage Categories">
			<p className="text-p4 text-muted w-full">
				Add, rename, or delete categories. <br />
				<IconWarning className="inline pb-0.5 fill-red-500" /> Deleting a category will
				remove it from all related transactions and associated budget.
			</p>

			<div className="flex-center-full">
				{isAdding ? (
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="settings-option hover:bg-transparent group flex-center-full py-1 "
					>
						<div className="cursor-default flex-center gap-3 flex-1 ">
							<div
								className="relative flex-center rounded-full border shrink-0 size-10 "
								onClick={() => setShowIconPicker((prev) => !prev)}
							>
								{Icon ? <Icon /> : <span>?</span>}
								<CategoryIconPick
									open={showIconPicker}
									setIcon={(icon) => setValue("icon", icon)}
									close={() => setShowIconPicker(false)}
								/>
							</div>
							<div className="input-container text-p4 flex-1">
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
						</div>
						<button
							className="btn btn-primary bg-accent py-1 disabled:opacity-50 text-white
                            disabled:pointer-events-none "
							type="submit"
							disabled={!watch("name")}
						>
							Add{" "}
						</button>
						<button
							type="button"
							disabled={!isAdding}
							className="btn btn-destroy py-1"
							onClick={() => {
								setIsAdding(false);
								reset();
							}}
						>
							Cancel
						</button>
					</form>
				) : (
					<button
						onClick={() => setIsAdding(true)}
						className="btn btn-secondary w-full py-2"
					>
						+ Add Category{" "}
					</button>
				)}
			</div>

			<div className="flex-column  gap-1  p-0.5 max-h-[42vh] overflow-auto ">
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
