import CategoryIconPick from "@/components/CategoryIconPick";
import { iconMap } from "@/components/constants";
import { CategoriesType } from "@/components/constants/types";

import IconCloseModal from "@/components/svg/IconCloseModal";
import { Edit } from "lucide-react";
import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";

const CategoryEditDelete = ({ category }: { category: CategoriesType }) => {
	const [editing, setEditing] = useState({
		isEditing: false,
		name: category.name,
		icon: category.icon,
	});
	const Icon = useMemo(() => iconMap[editing.icon as keyof typeof iconMap], [editing.icon]);
	const [showIconPicker, setShowIconPicker] = useState(false);

	const dispatch = useDispatch();
	let disabled = false;
	if (category.name === "Other") {
		disabled = true;
	}
	const showIcon = category.icon || editing.icon || category.name !== "Other";
	const isEditable = editing.isEditing;
	const handleIconClick = () => {
		if (isEditable) setShowIconPicker((prev) => !prev);
	};
	return (
		<div
			key={category.name}
			className="settings-option hover:bg-accent/20 group flex-center p-1 "
		>
			<div className="cursor-default flex items-center gap-1 flex-1">
				{showIcon && (
					<div
						onClick={handleIconClick}
						aria-label="Change category icon"
						className={`flex-center rounded-full border p-2 size-10 relative transition-colors
                            ${
								isEditable
									? "border-accent bg-accent/30 text-accent cursor-pointer"
									: "border-transparent cursor-default"
							}
                        `}
					>
						{Icon && <Icon />}
						<CategoryIconPick
							open={showIconPicker}
							setIcon={(i) => setEditing((prev) => ({ ...prev, icon: i }))}
							close={() => setShowIconPicker(false)}
						/>
					</div>
				)}
				<input
					className={`text-h3 ml-2 border border-transparent ${
						editing.isEditing && "input-container border  bg-muted/20"
					} p-2 outline-none flex-1`}
					disabled={!editing.isEditing}
					type="text"
					value={editing.name}
					onChange={(e) => setEditing({ ...editing, name: e.target.value })}
				/>
			</div>
			<div className="flex-center gap-3">
				<button
					className="flex-center"
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
						<p className="btn btn-secondary bg-accent px-2 py-1 text-white text-p4">
							Update
						</p>
					) : (
						<Edit className="text-muted size-5 hover:text-fg cursor-pointer hover:scale-110 transition-all duration-200" />
					)}
				</button>

				{!disabled &&
					(editing.isEditing ? (
						<button
							className="btn btn-destroy py-1 text-p4 px-2"
							onClick={() =>
								setEditing({
									...editing,
									isEditing: false,
									name: category.name,
									icon: category.icon,
								})
							}
						>
							Cancel
						</button>
					) : (
						<button
							onClick={() =>
								dispatch({ type: "finance/deleteCategory", payload: category })
							}
						>
							<IconCloseModal className="fill-muted size-5 stroke-2 hover:fill-red-500 cursor-pointer hover:scale-110 transition-all duration-200" />
						</button>
					))}
			</div>
		</div>
	);
};

export default CategoryEditDelete;
