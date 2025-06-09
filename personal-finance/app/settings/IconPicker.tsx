import { profileIcons } from "@/components/constants";
import Modal from "@/components/Modal";
import Image from "next/image";
import React from "react";

interface IconPickerProps {
	open: boolean;
	close: () => void;
	setIcon: (icon: string) => void;
	selected: string | null;
}

const IconPicker = ({ open, close, setIcon, selected }: IconPickerProps) => {
	return (
		<Modal open={open} close={close} title="Choose Profile Icon">
			<div className="grid grid-cols-4 md:grid-cols-5  gap-4 overflow-y-auto">
				{profileIcons.map((icon) => (
					<button
						key={icon.title}
						title={icon.title}
						onClick={() => {
							setIcon(icon.iconSrc);
							close();
						}}
						className={`group flex-center aspect-square p-4 rounded-full border-2 border-transparent   ${
							selected === icon.iconSrc
								? "border-accent! bg-accent/50 pointer-events-none"
								: "hover:border-accent transition-all duration-200 hover:bg-accent/40"
						}`}
					>
						<Image
							src={icon.iconSrc}
							alt={icon.alt}
							width={56}
							height={56}
							className="transition-transform duration-300 group-hover:scale-110 size-12 md:size-14 dark:filter dark:invert dark:opacity-80"
						/>
					</button>
				))}
			</div>
		</Modal>
	);
};

export default IconPicker;
