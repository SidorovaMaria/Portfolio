'use client";';
import { useRouter } from "next/navigation";
import IconCaretLeft from "../svg/IconCaretLeft";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import IconPot from "../svg/IconPot";
import { toLocaleStringWithCommas } from "@/lib/helperFunctions";

const PotsOverview = () => {
	const router = useRouter();
	const { pots } = useSelector((state: RootState) => state.finance);
	const totalSaved = pots.reduce((acc, pot) => acc + pot.total, 0);

	return (
		<section className="modal-content ">
			<div className="flex w-full items-center justify-between">
				<h2 className="text-2 font-bold leading-120">Pots</h2>
				<button
					className="btn btn-tertiary group duration-300 transition-all"
					onClick={() => router.push("/pots")}
				>
					See Details
					<span className="ml-3 inline-flex">
						<IconCaretLeft className=" duration-300 transition-all fill-grey-300 rotate-180 group-hover:fill-grey-900" />
					</span>
				</button>
			</div>
			<div className="flex flex-col items-center justify-start w-full gap-5">
				<aside className="flex gap-4 w-full items-center justify-start">
					<IconPot className="w-10 h-10" />
					<div className="flex flex-col gap-2.5 justify-between h-full">
						<p className="text-4 leading-150 text-grey-500">Total Saved</p>
						<h5 className="text-1 font-bold leading-120">
							{toLocaleStringWithCommas(totalSaved, "USD", 0)}
						</h5>
					</div>
				</aside>
				<div className="grid grid-cols-2 gap-4 w-full">
					{pots.map((pot) => (
						<section
							key={pot.id}
							className="flex flex-col gap-1 w-full pl-5 min-h-10 relative"
						>
							<span
								className="absolute h-full w-1 left-0 top-0 rounded-8"
								style={{
									backgroundColor: pot.theme.value,
								}}
							></span>
							<p className="text-5 text-grey-500 leading-150 ">{pot.name}</p>
							<p className="text-4 font-bold leading-150">
								{toLocaleStringWithCommas(pot.total, "USD", 0)}
							</p>
						</section>
					))}
				</div>
			</div>
		</section>
	);
};

export default PotsOverview;
