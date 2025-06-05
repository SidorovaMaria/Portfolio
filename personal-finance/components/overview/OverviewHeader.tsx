import React from "react";
import IconCaretLeft from "../svg/IconCaretLeft";
interface OverviewHeaderProps {
	handleNavigation: () => void;
	ariaLabel: string;
	ariaTitle: string;
	text: string;
	title: string;
}
const OverviewHeader = ({
	handleNavigation,
	ariaLabel,
	ariaTitle,
	text,
	title,
}: OverviewHeaderProps) => {
	return (
		<div className="flex-between" typeof="header">
			<h2 className="text-h2">{title}</h2>
			<button
				className="btn btn-tertiary py-2 group duration-300 transition-all"
				onClick={handleNavigation}
				title={ariaTitle}
				aria-label={ariaLabel}
			>
				{text}
				<span className="ml-3 inline-flex" aria-hidden="true">
					<IconCaretLeft className="duration-300 transition-all fill-muted rotate-180 group-hover:fill-fg" />
				</span>
			</button>
		</div>
	);
};

export default OverviewHeader;
