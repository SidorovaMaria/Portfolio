import { useState } from "react";
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
	const isTheme = optionType === "themes";
	const isCategory = optionType === "categories";
	const renderSelectedIcon = () => {
		if (isTheme && "value" in selected) {
			return (
				<span
					className="w-4 h-4 rounded-full"
					style={{ backgroundColor: selected.value }}
				/>
			);
		}

		if (isCategory && "icon" in selected) {
			const Icon = iconMap[selected.icon as keyof typeof iconMap];
			return Icon ? <Icon /> : null;
		}

		return null;
	};
	const renderOptionIcon = (option: CategoriesType | ThemeType) => {
		if (isTheme && "value" in option) {
			return (
				<span className="w-4 h-4 rounded-full" style={{ backgroundColor: option.value }} />
			);
		}

		if (isCategory && "icon" in option) {
			const Icon = iconMap[option.icon as keyof typeof iconMap];
			return Icon ? <Icon /> : null;
		}

		return null;
	};

	return (
		<div className="flex-column gap-1 ">
			<div className="flex-between">
				<label htmlFor="potName" className="text-p5-bold text-muted">
					{label}
				</label>
				{error && (
					<p className="error-message ">
						<IconWarning className="inline-flex  fill-red-500 " />
						{error}
					</p>
				)}
			</div>
			<div className="input-container relative">
				<div className="flex items-center gap-3 w-full">
					{renderSelectedIcon()}
					<p className="text-fg text-p4 flex-1">{selected.name} </p>
					<button type="button" className="w-4 h-4" onClick={() => setOpen(!open)}>
						<IconCaretLeft
							className={` -rotate-90 fill-fg w-3 h-3 cursor-pointer transition-all duration-300 ${
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
							className="absolute top-full w-full left-0 max-h-[150px] overflow-auto bg-bg flex flex-col mt-1 shadow-[0px_4px_5px] shadow-fg/25 rounded-8 transition-colors duration-300 z-50"
						>
							{options.map((option) => (
								<div
									key={option.name}
									className={`flex items-center gap-3 w-full cursor-pointer hover:bg-muted-alt rounded-8 transition-all duration-300 px-5 py-3 ${
										selected.name === option.name &&
										"font-bold bg-accent text-white"
									}`}
									onClick={() => {
										setSelected(option);
										setOpen(false);
									}}
								>
									{renderOptionIcon(option)}
									<p className="flex-1">{option.name} </p>
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
