'use client";';
import { useRouter } from "next/navigation";

import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import IconPot from "../svg/IconPot";
import { toLocaleStringWithCommas } from "@/lib/helperFunctions";
import OverviewHeader from "./OverviewHeader";

const PotsOverview = () => {
	const router = useRouter();
	const { pots, currency } = useSelector((state: RootState) => state.finance);
	const totalSaved = pots.reduce((acc, pot) => acc + pot.total, 0);
	const handleNavigation = () => router.push("/pots");
	return (
		<section className="modal-content" aria-labelledby="Top 4 Pots">
			<OverviewHeader
				title="Pots"
				handleNavigation={handleNavigation}
				ariaLabel="Navigate to all pots page"
				ariaTitle="View All Pots"
				text="View All"
			/>

			<div className="flex-column items-center justify-start gap-5 md:grid md:grid-cols-[2fr_3fr] ">
				<div
					className="flex w-full h-full items-center justify-start gap-4 bg-surface p-4 rounded-12"
					aria-label="Total Saved across all pots"
				>
					<IconPot className="w-10 h-10" aria-hidden="true" />
					<div className="flex flex-col gap-2 justify-center h-full">
						<p className="text-p4 text-muted ">Total Saved</p>
						<h5 className="text-h1">
							{toLocaleStringWithCommas(totalSaved, currency, 0)}
						</h5>
					</div>
				</div>
				<ul
					className="grid grid-cols-2 gap-4 w-full"
					role="list"
					aria-label="List of savings pots"
				>
					{pots.slice(0, 4).map((pot) => (
						<li key={pot.id} className="flex-column gap-1 pl-5 min-h-10 relative">
							<span
								className="absolute h-full w-1 left-0 top-0 rounded-8"
								aria-hidden="true"
								style={{
									backgroundColor: pot.theme.value,
								}}
							></span>
							<p className="text-p5 text-muted">{pot.name}</p>
							<p className="text-p4-bold text-fg">
								{toLocaleStringWithCommas(pot.total, currency, 0)}
							</p>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};

export default PotsOverview;
