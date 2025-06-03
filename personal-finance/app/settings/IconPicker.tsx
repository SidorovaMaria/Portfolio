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
				className="modal-content w-full max-w-[660px] origin-top"
			>
				<h4 className="text-1 font-semibold leading-15 capitalize">
					Chose your profile Icon
				</h4>
				<div className="grid grid-cols-5 gap-5  ">
					{profileIcons.map((icon) => (
						<button
							key={icon.title}
							className="hover:bg-secondary-green/50 p-5 rounded-full cursor-pointer transition-all duration-200 border hover:border-2 hover:scale-110 filter "
							title={icon.title}
							onClick={() => {
								setIcon(icon.iconSrc);
								close();
							}}
						>
							<Image
								src={icon.iconSrc}
								alt={icon.alt}
								width={70}
								height={70}
								className="group-hover:filter "
							/>
						</button>
					))}
				</div>
			</motion.div>
		</motion.div>
	);
};

export default IconPicker;
