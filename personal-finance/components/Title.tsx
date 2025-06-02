import React from "react";
interface TitleProps {
	title: string;
	period?: string;
	btn?: boolean;
	btnText?: string;
	onClick?: () => void;
}
const Title = ({ title, btn, btnText, onClick, period }: TitleProps) => {
	return (
		<div className="text-1 font-bold text-grey-900 w-full flex items-center justify-between ">
			<h1>
				{title}
				{period && (
					<span className="block md:inline-block text-3 md:text-1 align-middle leading-120 font-semibold text-secondary-green ml-4">
						( {period} )
					</span>
				)}
			</h1>
			{btn && (
				<button className="btn btn-primary text-4 font-bold" onClick={onClick}>
					{btnText}
				</button>
			)}
		</div>
	);
};

export default Title;
