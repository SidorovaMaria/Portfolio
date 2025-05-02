import React from "react";

const SettingsBtn = ({ onClick, icon, title, intro, id, selected, name }) => {
	return (
		<button
			className={`border-btn p-4 w-full flex items-center gap-4 rounded-12 border border-n-300 dark:border-n-800 cursor-pointer group hover:bg-n-50 dark:hover:bg-n-800 ${
				selected && "bg-n-50 dark:bg-n-800!"
			}`}
			onClick={onClick}
		>
			<div
				className={`flex items-center justify-center w-10 h-10 rounded-12 border border-neutral-200 dark:border-n-800 group group-hover:dark:bg-n-950 ${
					selected && "bg-n-50 dark:bg-n-950"
				}`}
			>
				{icon}
			</div>
			<div className="flex flex-col gap-[6px] flex-1 text-left">
				<h2 className="text-4">{title}</h2>
				<p className="text-6 text-neutral-700  dark:text-n-300">{intro}</p>
			</div>
			<label
				htmlFor={id}
				className="w-4 h-4 rounded-full fill-white border-neutral-200 border-2 has-checked:border-[4px]
			has-checked:border-blue-500"
			>
				<input
					type="radio"
					name={name}
					checked={selected}
					id={id}
					readOnly
					className="appearance-none"
				/>
			</label>
		</button>
	);
};

export default SettingsBtn;
