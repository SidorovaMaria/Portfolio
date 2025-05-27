"use client";
import PotModal from "@/components/modals/PotModal";
import Pot from "@/components/Pot";
import Title from "@/components/Title";
import { RootState } from "@/lib/store";
import { AnimatePresence } from "motion/react";

import { useState } from "react";
import { useSelector } from "react-redux";

export default function Pots() {
	const { pots } = useSelector((state: RootState) => state.finance);
	const [openModal, setOpenModal] = useState<{
		mode: string;
		open: boolean;
	}>({
		mode: "",
		open: false,
	});
	console.log(pots);
	return (
		<>
			<Title
				title="Pots"
				btn={true}
				btnText="+ Add New Pot"
				onClick={() =>
					setOpenModal((prev) => ({
						...prev,
						mode: "add",
						open: true,
					}))
				}
			/>
			<AnimatePresence>
				{openModal.open && <PotModal mode={openModal.mode} setOpenModal={setOpenModal} />}
			</AnimatePresence>
			<section className="flex flex-col gap-6 items-center justify-start w-full">
				{pots.length > 0 ? pots.map((pot) => <Pot key={pot.id} pot={pot} />) : null}
			</section>
		</>
	);
}
