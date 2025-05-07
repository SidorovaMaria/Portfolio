import React from "react";
import InfoIcon from "../assets/images/info-circle.svg?react";
const FormInput = ({ name, type, label, value, formik, id, placeholder, error, touched }) => {
	return (
		<div className="flex flex-col w-full gap-2">
			<label htmlFor={id} className="text-6 regular text-n-900">
				{label}
			</label>
			<div className="flex w-full flex-col gap-1.5">
				<input
					className="input"
					id={id}
					type={type}
					name={name}
					placeholder={placeholder}
					value={value}
					onChange={formik.handleChange}
				/>
				{error && touched && (
					<article className="text-red-700 text-9 flex gap-1.5 items-center">
						<InfoIcon className="w-3 h-3" />

						{error}
					</article>
				)}
			</div>
		</div>
	);
};

export default FormInput;
