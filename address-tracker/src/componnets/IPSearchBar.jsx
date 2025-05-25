import { ChevronRight } from "lucide-react";
import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "motion/react";

const IPSearchBar = ({ ipInput, setIpInput, onSubmit }) => {
	const [error, setError] = useState("");
	const validateIP = (ip) => {
		const regex =
			/^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;
		return regex.test(ip);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateIP(ipInput)) {
			setError("");

			onSubmit(ipInput);
		} else {
			setError("Invalid IP address format!");
		}
	};
	return (
		<form
			className="flex rounded-[15px]  w-full relative max-w-[555px] mx-auto "
			onSubmit={handleSubmit}
		>
			<div className="bg-white py-4 px-6 w-full rounded-l-[15px] ">
				<input
					type="text"
					value={ipInput}
					onChange={(e) => {
						setIpInput(e.target.value);
						setError("");
					}}
					placeholder="Search for any IP address or domain "
					className="w-full outline-none "
				/>
			</div>
			<button
				type="submit"
				className="bg-black px-4 hover:bg-[#3F3F3F] transition-all duration-300 ease-in-out cursor-pointer group rounded-r-[15px]"
			>
				<ChevronRight
					size={24}
					strokeWidth={3}
					className=" text-white group-hover:scale-110 transition-all duration-300 ease-in-out "
				/>
			</button>
			<AnimatePresence>
				{error && (
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="absolute text-red-500 text-sm font-medium top-full right-0 mt-2 px-3 rounded-md backdrop-blur-sm bg-white/70"
					>
						{error}
					</motion.p>
				)}
			</AnimatePresence>
		</form>
	);
};

export default IPSearchBar;
