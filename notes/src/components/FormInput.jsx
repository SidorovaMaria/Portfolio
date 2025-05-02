import React, { useState } from "react";
import { Link } from "react-router";
import ShowPasswordIcon from "../assets/images/icon-show-password.svg?react";
import HidePasswordIcon from "../assets/images/icon-hide-password.svg?react";

const FormInput = ({ label, id, type, name, value, formik, placeholder, disabled = false }) => {
	const [showPassword, setShowPassword] = useState(false);
	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};
	return (
		<div className="w-full flex flex-col gap-[6px] ">
			<div className="flex flex-col-reverse gap-2">
				<div
					className="flex gap-2 px-4 text-5 py-3 border rounded-8 border-n-300 dark:border-n-600 placeholder:text-n-500
                    hover:bg-n-50 dark:hover:bg-n-800
                has-focus:border-n-950 dark:has-focus:border-n-600 has-focus:outline-offset-2 has-focus:outline-2 has-focus:outline-n-500 dark:has-focus:outline-n-600"
				>
					<input
						disabled={disabled}
						type={id === "password" ? (showPassword ? "text" : "password") : type}
						id={id}
						name={name}
						value={value}
						onChange={formik.handleChange}
						placeholder={placeholder}
						className="flex-1 outline-none"
					/>
					{name === "password" &&
						(!showPassword ? (
							<ShowPasswordIcon
								alt="Show Password"
								className="cursor-pointer text-n-950 dark:text-n-0"
								onClick={togglePasswordVisibility}
							/>
						) : (
							<HidePasswordIcon
								alt="Hide Password"
								className="cursor-pointer text-n-950 dark:text-n-0"
								onClick={togglePasswordVisibility}
							/>
						))}
				</div>
				<div className="flex items-center justify-between">
					<label htmlFor={id} className="text-4">
						{label}
					</label>
					{type === "password" && (
						<Link
							to="/forgot"
							className="text-xs leding-[17px] underline text-n-600 dark:text-n-400 hover:text-blue-500 cursor-pointer"
						>
							Forgot
						</Link>
					)}
				</div>
			</div>
		</div>
	);
};

export default FormInput;
