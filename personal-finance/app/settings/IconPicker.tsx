import { profileIcons } from "@/components/constants";
import { modalContentVariant, ModalOverlayVariant } from "@/components/constants/motionVariants";
import { motion } from "motion/react";
import Image from "next/image";
import React from "react";
interface IconPickerProps {
	close: () => void;
	setIcon: (icon: string) => void;
}
const IconPicker = ({ close, setIcon }: IconPickerProps) => {
	return (
		<motion.div
			initial={"initial"}
			animate={"show"}
			exit={"exit"}
			onClick={close}
			variants={ModalOverlayVariant}
			className="modal-overlay px-5 z-50 "
		>
			<motion.div
				onClick={(e) => e.stopPropagation()}
				variants={modalContentVariant}
				className="modal-content gap-1 md:gap-3 w-full max-w-[660px] origin-top"
			>
				<h4 className="text-2 md:text-1 text-center font-semibold leading-15 capitalize">
					Chose your profile Icon
				</h4>
				<div className="grid grid-cols-4 md:grid-cols-5 gap-3 md:gap-5  ">
					{profileIcons.map((icon) => (
						<button
							key={icon.title}
							className="hover:bg-secondary-green/50 size-24 flex items-center justify-center rounded-full cursor-pointer transition-all duration-200 border hover:border-2  group  "
							title={icon.title}
							onClick={() => {
								setIcon(icon.iconSrc);
								close();
							}}
						>
							<Image
								src={icon.iconSrc}
								alt={icon.alt}
								width={60}
								height={60}
								className="group-hover:filter group-hover:scale-110 duration-300 transition-all"
							/>
						</button>
					))}
				</div>
			</motion.div>
		</motion.div>
	);
};

export default IconPicker;
