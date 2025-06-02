import React, { useState } from "react";
import IconCaretLeft from "../svg/IconCaretLeft";
import { AnimatePresence, motion } from "motion/react";
import { selectDropDownVariant } from "../constants/motionVariants";
import { CategoriesType, iconMap, ThemeType } from "../constants";
import IconWarning from "../svg/IconWarning";
interface ModalDropDownProps {
	label: string;
	optionType: "categories" | "themes";
	options: CategoriesType[] | ThemeType[];
	selected: CategoriesType | ThemeType;
	setSelected: (value: CategoriesType | ThemeType) => void;
	error?: string;
}

const ModalDropDown = ({
	label,
	options,
	selected,
	error,
	setSelected,
	optionType,
}: ModalDropDownProps) => {
	const [open, setOpen] = useState(false);
	const categoryIcon = optionType === "categories" && "icon" in selected ? selected.icon : null;
	return (
		<div className="flex flex-col gap-1 w-full">
			<div className="flex items-center justify-between">
				<label htmlFor="potName" className="text-5 font-bold leading-150 text-grey-500">
					{label}
				</label>
				{error && (
					<p className="error-message ">
						<IconWarning className="inline-flex  fill-red-500 " />

						{error}
					</p>
				)}
			</div>
			<div className="px-5 text-4 leading-150 py-3 rounded-8 bg-white border border-beige-500 has-focus-within:border-grey-900 relative">
				<div className="flex items-center gap-3 w-full">
					{optionType === "themes" && (
						<span
							className="w-4 h-4 rounded-full"
							style={{
								backgroundColor:
									optionType === "themes" && "value" in selected
										? selected.value
										: undefined,
							}}
						/>
					)}
					{optionType === "categories" &&
						categoryIcon &&
						(() => {
							const Icon =
								optionType === "categories" && "icon" in selected
									? iconMap[selected.icon as keyof typeof iconMap]
									: null;
							return Icon ? <Icon /> : null;
						})()}

					<p className="text-grey-900 flex-1">{selected.name} </p>
					<button type="button" className="w-4 h-4" onClick={() => setOpen(!open)}>
						<IconCaretLeft
							className={` -rotate-90 fill-grey-900 w-3 h-3 cursor-pointer ${
								open && "rotate-90"
							} `}
						/>
					</button>
				</div>
				<AnimatePresence>
					{open && (
						<motion.aside
							initial="hidden"
							animate="show"
							exit="exit"
							variants={selectDropDownVariant}
							transition={{
								duration: 0.3,
								type: "spring",
								stiffness: 100,
							}}
							className="absolute  top-full w-full left-0 max-h-[150px] overflow-auto bg-white flex flex-col mt-1 shadow-[0px_4px_24px_rgba(0,0,0,0,0.25)] rounded-8 transition-colors duration-300 z-50"
						>
							{options.map((option) => (
								<div
									key={option.name}
									className="flex items-center gap-3 w-full cursor-pointer hover:bg-grey-300 px-5 py-3"
									onClick={() => {
										setSelected(option);
										setOpen(false);
									}}
								>
									{optionType === "themes" && (
										<span
											className="w-4 h-4 rounded-full"
											style={{
												backgroundColor:
													optionType === "themes" && "value" in option
														? option.value
														: undefined,
											}}
										/>
									)}
									{optionType === "categories" &&
										categoryIcon &&
										(() => {
											const Icon =
												optionType === "categories" && "icon" in option
													? iconMap[option.icon as keyof typeof iconMap]
													: null;
											return Icon ? <Icon /> : null;
										})()}
									<p className="text-grey-900 flex-1">{option.name} </p>
								</div>
							))}
						</motion.aside>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
};

export default ModalDropDown;
