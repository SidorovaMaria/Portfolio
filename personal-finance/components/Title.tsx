import React from "react";
interface TitleProps {
	title: string;
	btn?: boolean;
	btnText?: string;
	onClick?: () => void;
}
const Title = ({ title, btn, btnText, onClick }: TitleProps) => {
	return (
		<div className="text-1 font-bold text-grey-900 w-full flex items-center justify-between ">
			<h1>{title}</h1>
			{btn && (
				<button className="btn btn-primary text-4 font-bold" onClick={onClick}>
					{btnText}
				</button>
			)}
		</div>
	);
};

export default Title;
