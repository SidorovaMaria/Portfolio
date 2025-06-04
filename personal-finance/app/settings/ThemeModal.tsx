import Modal from "@/components/Modal";
import { FontType, useFont } from "@/lib/hooks/UseFont";
import { Check } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";
interface ThemeModalProps {
	open: boolean;
	close: () => void;
}

const ThemeModal = ({ open, close }: ThemeModalProps) => {
	const { theme, setTheme } = useTheme();
	const { font, changeFont } = useFont();
	const fontOptions: FontType[] = ["sans", "serif", "mono"];

	return (
		<Modal open={open} close={close}>
			<div className="flex flex-col w-full gap-3">
				<h2 className="text-2 leading-120 font-bold w-full">Set Theme</h2>
				<p className="text-4 leading-150 text-grey-500 w-full">
					Select the theme you want to use for the application. This will change the
					overall look and feel of the app.
				</p>
			</div>
			<div className="flex flex-col w-full gap-2">
				<p className="text-grey-500 text-4">Appearance</p>
				<div className="flex flex-col w-full gap-1 md:flex-row md:justify-between">
					{["light", "dark", "system"].map((t) => (
						<button
							key={t}
							className="settings-option hover:bg-secondary-green/20 group flex items-center py-2"
							onClick={() => setTheme(t)}
						>
							<p className="capitalize">{t}</p>
							<span
								className={`size-6 ml-auto rounded-full flex items-center justify-center ${
									theme === t
										? "bg-secondary-green border-secondary-green"
										: "bg-white border border-grey-300"
								}`}
							>
								{theme === t && <Check className="size-4 text-white" />}
							</span>
						</button>
					))}
				</div>
			</div>
			<div className="flex flex-col w-full gap-2">
				<p className="text-grey-500 text-4">Font Family</p>
				<div className="flex flex-col gap-1 md:flex-row md:justify-between">
					{fontOptions.map((f) => (
						<button
							key={f}
							className="settings-option hover:bg-secondary-green/20 group flex items-center py-2"
							onClick={() => changeFont(f)}
						>
							<p className="capitalize">{f}</p>
							<span
								className={`size-6 ml-auto rounded-full flex items-center justify-center ${
									font === f
										? "bg-secondary-green border-secondary-green"
										: "bg-white border border-grey-300"
								}`}
							>
								{font === f && <Check className="size-4 text-white" />}
							</span>
						</button>
					))}
				</div>
			</div>
		</Modal>
	);
};

export default ThemeModal;
