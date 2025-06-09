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
		<Modal open={open} close={close} title="Set Theme">
			<p className="text-p4 text-muted w-full">
				Select the theme you want to use for the application. This will change the overall
				look and feel of the app.
			</p>

			<div className="flex-column gap-2">
				<p className="text-p4-bold text-muted">Appearance</p>
				<div className="flex-column gap-1 md:flex-row md:justify-between">
					{["light", "dark", "system"].map((t) => (
						<button
							key={t}
							className="settings-option hover:bg-accent/20 group flex items-center py-2"
							onClick={() => setTheme(t)}
						>
							<p className="capitalize">{t}</p>
							<span
								className={`size-6 ml-auto rounded-full flex-center ${
									theme === t
										? "bg-accent border-acent"
										: "bg-bg border border-grey-300"
								}`}
							>
								{theme === t && <Check className="size-4 text-white" />}
							</span>
						</button>
					))}
				</div>
			</div>
			<div className="flex-column gap-2">
				<p className="text-p4-bold text-muted">Font Family</p>
				<div className="flex-column gap-1 md:flex-row md:justify-between">
					{fontOptions.map((f) => (
						<button
							key={f}
							className="settings-option hover:bg-accent/20 group py-2"
							onClick={() => changeFont(f)}
						>
							<p className="capitalize">{f}</p>
							<span
								className={`size-6 ml-auto rounded-full flex-center ${
									font === f
										? "bg-accent border-acent"
										: "bg-bg border border-grey-300"
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
