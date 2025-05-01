import React from "react";
import ArrowLeftIcon from "../assets/images/icon-arrow-left.svg?react";
import SansSerifIcon from "../assets/images/icon-font-sans-serif.svg?react";
import SerifIcon from "../assets/images/icon-font-serif.svg?react";
import MonoSpaceIcon from "../assets/images/icon-font-monospace.svg?react";
import SettingsBtn from "./SettingsBtn";
import { useDispatch, useSelector } from "react-redux";
import { setFont } from "../redux/themeSlice";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import CustomToast from "./CustomToast";

const FontTheme = () => {
	const { font } = useSelector((state) => state.theme);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const setPickedFont = (newfont) => {
		if (font === newfont) return;
		let fontFamily;

		switch (newfont) {
			case "sans":
				fontFamily = "sans-serif";
				break;
			case "serif":
				fontFamily = "serif";
				break;
			case "code":
				fontFamily = "monospace";
				break;
			default:
				fontFamily = newfont;
		}

		dispatch(setFont(newfont));
		toast.custom((t) => <CustomToast t={t} message={`Changed font to ${fontFamily}`} />);
	};
	return (
		<React.Fragment>
			<div
				className="flex gap-1 text-n-600 items-center lg:hidden mb-3"
				onClick={() => navigate("/tags")}
			>
				<ArrowLeftIcon className="w-4.5 h-4.5" />
				<p className="text-5 cursor-pointer">Settings</p>
			</div>
			<div className="flex lg:gap-1 gap-2 flex-col w-full">
				<h2 className="text-1 lg:text-base lg:tracking-[-0.3px] lg:font-semibold">
					Font Theme
				</h2>
				<p className="text-5 text-n-700">Choose your font theme:</p>
				<SettingsBtn
					icon={<SansSerifIcon />}
					title="Sans Serif "
					intro="Clean and modern, easy to read."
					onClick={() => setPickedFont("sans")}
					selected={font === "sans"}
					name={"font"}
					id={"theme-font-sans"}
				/>
				<SettingsBtn
					icon={<SerifIcon />}
					title=" Serif"
					intro="Classic and elegant for a timeless feel."
					onClick={() => setPickedFont("serif")}
					selected={font === "serif"}
					name={"font"}
					id={"theme-font-serif"}
				/>
				<SettingsBtn
					icon={<MonoSpaceIcon />}
					title=" Monospace"
					intro="Code-like, great for a technical vibe."
					onClick={() => setPickedFont("code")}
					selected={font === "code"}
					name={"font"}
					id={"theme-font-mono"}
				/>
			</div>
		</React.Fragment>
	);
};

export default FontTheme;
