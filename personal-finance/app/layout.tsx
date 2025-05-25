import type { Metadata } from "next";

import "./globals.css";
import NavBar from "@/components/NavBar";
import DesktopNavBar from "@/components/DesktopNavBar";

export const metadata: Metadata = {
	title: "Personal Finance App",
	authors: [{ name: "Maria Sidorova", url: "https://yourwebsite.com" }],
	description:
		"A personal finance application to manage your expenses and income. Challenge from Frontend Mentor.",
	keywords: ["personal finance", "expense tracker", "income management", "budgeting app"],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="flex ">
				<NavBar />
				<DesktopNavBar />
				{children}
			</body>
		</html>
	);
}
