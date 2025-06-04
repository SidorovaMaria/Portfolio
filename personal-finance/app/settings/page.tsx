"use client";
import Title from "@/components/Title";
import React from "react";
import ProfileBoard from "./ProfileBoard";
import { Blend, Eye, LogOut, PaintBucket, Palette, Receipt, User } from "lucide-react";
import Link from "next/link";

import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

import CategoriesModal from "./CategoriesModal";
import CurrencyModal from "./CurrencyModal";
import ThemeModal from "./ThemeModal";

const Settings = () => {
	const { currency } = useSelector((state: RootState) => state.finance);
	const changeAccentColor = () => {
		document.documentElement.style.setProperty(
			"--secondary-green",
			"#211C6C" // Change this to the desired color
		);
		console.log("Accent color changed to #211C6C");
	};
	const [categoriesModal, setCategoriesModal] = React.useState(false);
	const [currencyModal, setCurrencyModal] = React.useState(false);
	const [themeModal, setThemeModal] = React.useState(false);

	return (
		<>
			<Title title="Settings" btn btnText={`Logout`}>
				<LogOut className="stroke-2" />
			</Title>
			<ProfileBoard />
			<section className="flex flex-col w-full gap-2">
				<h4 className="text-4 text-grey-500/80 font-medium">Account</h4>
				<div className="flex items-center gap-3 text-grey-900 hover:text-grey-900 transition-all duration-200 px-2">
					<User className="stroke-2 " />
					<Link
						href="/settings/profile"
						className="text-3 leading-150 hover:text-secondary-green transition-all duration-200"
					>
						Profile Data
					</Link>
				</div>
				<hr />
				<div className="flex items-center gap-3 text-grey-900 hover:text-grey-900 transition-all duration-200 px-2">
					<Eye className="stroke-2 " />
					<Link
						href="/settings/change-password"
						className="text-3 leading-150 hover:text-grey-900 transition-all duration-200"
					>
						Change Password
					</Link>
				</div>
			</section>
			<section className="w-full flex flex-col gap-4">
				<h4 className="text-4 text-grey-500/80 font-medium">Preferences</h4>
				<div className="settings-option group" onClick={() => setCategoriesModal(true)}>
					<div
						className="flex items-center gap-3 cursor-pointer"
						onClick={() => console.log("open categories")}
					>
						<Blend className="stroke-2 " />
						<div className="text-3 leading-150 transition-all duration-200">
							Categories
						</div>
					</div>
				</div>
				<div className="settings-option group" onClick={() => setCurrencyModal(true)}>
					<div className="flex items-center gap-3">
						<Receipt className="stroke-2 " />
						<div className="text-3 leading-150 transition-all duration-200">
							Currency
						</div>
					</div>

					<p className="text-4 leading-150 text-grey-500 group-hover:text-grey-900">
						{currency}
					</p>
				</div>
				<div className="settings-option group" onClick={() => setThemeModal(true)}>
					<div className="flex items-center gap-3">
						<Palette className="stroke-2 " />
						<div className="text-3 leading-150 transition-all duration-200">Theme</div>
					</div>

					<p className="text-4 leading-150 text-grey-500 group-hover:text-grey-900 capitalize">
						light
					</p>
				</div>
				<div className="settings-option" onClick={changeAccentColor}>
					<div className="flex items-center gap-3">
						<PaintBucket className="stroke-2 " />
						<div className="text-3 leading-150 transition-all duration-200">
							Accent Color
						</div>
					</div>

					<div className="size-5 rounded-full bg-secondary-green" />
				</div>
			</section>
			<CategoriesModal open={categoriesModal} close={() => setCategoriesModal(false)} />
			<CurrencyModal open={currencyModal} close={() => setCurrencyModal(false)} />
			<ThemeModal open={themeModal} close={() => setThemeModal(false)} />
		</>
	);
};

export default Settings;
