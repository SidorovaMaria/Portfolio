import type { Metadata } from "next";

import "./globals.css";
import NavBar from "@/components/NavBar";
import DesktopNavBar from "@/components/DesktopNavBar";
import ReduxProvider from "@/lib/ReduxProvider";

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
			<body className="flex lg:max-h-screen">
				<ReduxProvider>
					<NavBar />

					<DesktopNavBar />
					<main className="layout mb-[52px] md:mb-[74px] lg:mb-0 lg:max-h-screen overflow-auto flex flex-col ">
						{children}
					</main>
				</ReduxProvider>
			</body>
		</html>
	);
}
