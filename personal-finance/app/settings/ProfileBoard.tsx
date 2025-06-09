"use client";

import React, { useCallback, useState } from "react";
import IconPicker from "./IconPicker";
import Image from "next/image";
import { CircleFadingPlus } from "lucide-react";

const ProfileBoard = () => {
	const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);
	const [selectedIcon, setSelectedIcon] = useState<string>("/icons/growth.png");
	const handleIconClick = useCallback(() => {
		setIsIconPickerOpen((prev) => !prev);
	}, []);
	const handleClose = useCallback(() => {
		setIsIconPickerOpen(false);
	}, []);

	const handleIconSelect = useCallback(
		(icon: string) => {
			setSelectedIcon(icon);
			handleClose();
		},
		[handleClose]
	);

	return (
		<div className="flex-column ">
			<div className="flex items-center gap-4">
				<div className="size-24 rounded-full shrink-0 border flex-center relative opacity-80">
					<Image
						src={selectedIcon}
						alt="profile icon"
						height={64}
						width={64}
						className="filter dark:invert"
					/>
					<button
						title="Change Icon"
						className="absolute -right-1 -bottom-2 bg-grey-900 rounded-full p-0.5  cursor-pointer
                        hover:bg-accent transition-colors duration-300 text-fg hover:text-white"
						onClick={handleIconClick}
					>
						<CircleFadingPlus className="  " />
					</button>
				</div>
				<div className="flex-column gap-0.5 ">
					<p className="text-h2">John Doe</p>
					<p className="text-p4 text-muted">johndoe@gmail.com</p>
				</div>
			</div>
			<IconPicker
				open={isIconPickerOpen}
				close={handleClose}
				setIcon={handleIconSelect}
				selected={selectedIcon}
			/>
		</div>
	);
};

export default ProfileBoard;
