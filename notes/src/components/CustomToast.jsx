import React from "react";
import { toast } from "react-hot-toast";

import CrossIcon from "../assets/images/icon-cross.svg?react";
import CheckIcon from "../assets/images/icon-checkmark.svg?react";

const CustomToast = ({ t, message, linkText, onLinkClick }) => {
	return (
		<div
			className={`${
				t.visible ? "animate-enter" : "animate-leave"
			} w-3/4 md:w-1/2 lg:w-1/4 bg-white dark:bg-n-800 pointer-events-auto flex rounded-8 gap-2 p-2 ring-1 ring-n-200 dark:ring-n-700 items-center mb-20 lg:mb-5`}
		>
			<div className="w-4 h-4 flex items-center justify-center">
				<CheckIcon className="text-green-500" />
			</div>
			<div className="text-6 flex-1">{message}</div>

			{linkText && (
				<button onClick={onLinkClick} className="text-6 underline">
					{linkText}
				</button>
			)}

			<button
				className="w-4 h-4 flex items-center justify-between"
				onClick={() => toast.dismiss(t.id)}
			>
				<CrossIcon className="text-n-400" />
			</button>
		</div>
	);
};

export default CustomToast;
