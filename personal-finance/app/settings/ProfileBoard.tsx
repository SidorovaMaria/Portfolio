"use client";

import React from "react";
import { AnimatePresence } from "motion/react";
import IconPicker from "./IconPicker";
import Image from "next/image";
interface IconPictureState {
	isOpen: boolean;
	picture: null | string;
}

const ProfileBoard: React.FC = () => {
	const [iconPicture, setIconPicture] = React.useState<IconPictureState>({
		isOpen: false,
		picture: "",
	});
	return (
		<div className="flex flex-col w-full ">
			<div className="flex items-center w-full gap-4">
				<div
					className="size-20 rounded-full  border flex items-center justify-center"
					onClick={() => setIconPicture({ isOpen: !iconPicture.isOpen, picture: null })}
				>
					<Image
						src={iconPicture.picture || "/icons/growth.png"}
						alt="profile icon"
						height={50}
						className="text-white"
						width={50}
					/>
				</div>
				<div className="flex flex-col gap-0.5 justify-center">
					<p className="text-3 font-bold leading-150 text-grey-900">John Doe</p>
					<p className="text-3 leading-150 text-grey-500">johndoe@gmail.com</p>
				</div>
			</div>
			<AnimatePresence>
				{iconPicture.isOpen && (
					<IconPicker
						close={() =>
							setIconPicture((prev) => ({
								...prev,
								isOpen: false,
							}))
						}
						setIcon={(icon: string) =>
							setIconPicture((prev) => ({
								...prev,
								picture: icon,
							}))
						}
					/>
				)}
			</AnimatePresence>
		</div>
	);
};

export default ProfileBoard;
