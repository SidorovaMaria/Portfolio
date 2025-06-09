"use client";

// app/settings/page.tsx
// -- Imports --
import Title from "@/components/Title";
import React from "react";
import ProfileBoard from "./ProfileBoard";
import { Blend, Eye, LogOut, LucideIcon, Palette, Receipt, User } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
// -- Modals to chane Preferences --
import CategoriesModal from "./CategoriesModal";
import CurrencyModal from "./CurrencyModal";
import ThemeModal from "./ThemeModal";
import { useRouter } from "next/navigation";

type SettingsType = "categories" | "currency" | "theme";

const Settings = () => {
	const { currency } = useSelector((state: RootState) => state.finance);
	const [openSettingsOption, setOpenSettingsOption] = React.useState({
		setting: "",
		isOpen: false,
	});
	const openSettings = (setting: SettingsType) => {
		setOpenSettingsOption({ setting, isOpen: true });
	};
	const closeSettings = () => {
		setOpenSettingsOption({
			setting: "",
			isOpen: false,
		});
	};
	const router = useRouter();

	return (
		<>
			<Title title="Settings" btn btnText={`Logout`}>
				<LogOut className="stroke-2" />
			</Title>
			<ProfileBoard />
			<section className="flex-column gap-0.5 lg:max-w-1/2 mr-auto">
				<h4 className="text-p4-bold text-muted">Account</h4>
				<SettingsOption
					icon={User}
					label="Profile Data"
					onClick={() => router.push("/settings/profile")}
				/>
				<hr />
				<SettingsOption
					icon={Eye}
					label="Change Password"
					onClick={() => router.push("/settings/change-password")}
				/>
			</section>
			<section className="flex-column gap-2.5 lg:max-w-1/2 mr-auto">
				<h4 className="text-p4-bold text-grey-500/80 ">Preference</h4>
				<SettingsOption
					icon={Blend}
					label="Categories"
					onClick={() => openSettings("categories")}
				/>
				<SettingsOption
					icon={Palette}
					label="Appearance"
					onClick={() => openSettings("theme")}
				/>
				<SettingsOption
					icon={Receipt}
					label="Currency"
					onClick={() => openSettings("currency")}
					value={currency}
				/>
			</section>
			<CategoriesModal
				open={openSettingsOption.isOpen && openSettingsOption.setting === "categories"}
				close={closeSettings}
			/>
			<CurrencyModal
				open={openSettingsOption.isOpen && openSettingsOption.setting === "currency"}
				close={closeSettings}
			/>
			<ThemeModal
				open={openSettingsOption.isOpen && openSettingsOption.setting === "theme"}
				close={closeSettings}
			/>
		</>
	);
};

export default Settings;

const SettingsOption = ({
	icon,
	label,
	onClick,
	value,
}: {
	icon: LucideIcon;
	label: string;
	onClick: () => void;
	value?: string;
}) => {
	const Icon = icon;
	return (
		<div className="settings-option group" onClick={onClick}>
			<div className="flex-center  gap-3">
				<Icon className="stroke-2" />
				<div className="text-h3 font-normal">{label}</div>
			</div>
			<p className="text-p4 text-muted group-hover:text-fg">{value}</p>
		</div>
	);
};
