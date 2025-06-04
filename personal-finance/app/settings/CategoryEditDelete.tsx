import CategoryIconPick from "@/components/CategoryIconPick";
import { CategoriesType, iconMap } from "@/components/constants";
import IconCloseModal from "@/components/svg/IconCloseModal";
import { Edit } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const CategoryEditDelete = ({ category }: { category: CategoriesType }) => {
	const [editing, setEditing] = useState({
		isEditing: false,
		name: category.name,
		icon: category.icon,
	});
	const Icon = iconMap[editing.icon as keyof typeof iconMap];
	const [openIconOptions, setOpenIconOptions] = useState(false);

	const dispatch = useDispatch();
	let disabled = false;
	if (category.name === "Other") {
		disabled = true;
	}

	return (
		<div
			key={category.name}
			className="settings-option hover:bg-secondary-green/20 group flex items-center py-1 "
		>
			<div className={`cursor-default flex items-center  gap-3 flex-1 `}>
				{category.icon && (
					<div
						onClick={() => {
							if (editing.isEditing) {
								setOpenIconOptions(!openIconOptions);
							}
						}}
						className={`flex items-center justify-center rounded-full border p-2 size-10 relative ${
							editing.isEditing
								? "border-secondary-green bg-secondary-green/80 text-white cursor-pointer"
								: "border-transparent cursor-default"
						} `}
					>
						<Icon />
						<CategoryIconPick
							open={openIconOptions}
							setIcon={(i: keyof typeof iconMap) =>
								setEditing({ ...editing, icon: i })
							}
						/>
					</div>
				)}
				<input
					className={`text-3 leading-150 text-grey-900 border border-transparent ${
						editing.isEditing && "bg-white border-beige-500!"
					} rounded-md p-1 px-2 transition-all duration-200 outline-none focus:border-grey-900!`}
					disabled={!editing.isEditing}
					type="text"
					value={editing.name}
					onChange={(e) => setEditing({ ...editing, name: e.target.value })}
				/>
			</div>
			<div className="flex items-center gap-3">
				<button
					className="flex items-center justify-center"
					onClick={() => {
						if (
							(editing.isEditing && editing.name !== category.name) ||
							editing.icon !== category.icon
						) {
							dispatch({
								type: "finance/updateCategory",
								payload: {
									oldCategory: category,
									newCategory: {
										...category,
										name: editing.name,
										icon: editing.icon,
									},
								},
							});
						}
						setEditing({ ...editing, isEditing: !editing.isEditing });
					}}
				>
					{editing.isEditing &&
					(editing.name !== category.name || editing.icon !== category.icon) ? (
						<p className="btn btn-secondary bg-secondary-green! p-1 text-white">
							Update
						</p>
					) : (
						<Edit className="text-grey-500 size-5 hover:text-grey-900 cursor-pointer hover:scale-110 transition-all duration-200" />
					)}
				</button>

				{!disabled && (
					<button
						onClick={() =>
							dispatch({ type: "finance/deleteCategory", payload: category })
						}
					>
						<IconCloseModal className="fill-grey-500 size-5 strok-2 hover:fill-red-500 cursor-pointer hover:scale-110 transition-all duration-200" />
					</button>
				)}
			</div>
		</div>
	);
};

export default CategoryEditDelete;
