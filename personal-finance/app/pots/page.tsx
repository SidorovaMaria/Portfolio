"use client";
import AddEditPotModal from "@/components/modals/AddEditPotModal";
import Pot from "@/components/Pot";
import Title from "@/components/Title";
import { PotType } from "@/lib/features/financeSlice";
import { RootState } from "@/lib/store";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Pots() {
	const { pots } = useSelector((state: RootState) => state.finance);
	const [openModal, setOpenModal] = useState<{
		mode: string;
		open: boolean;
		pot: PotType | null;
	}>({
		mode: "",
		open: false,
		pot: null,
	});
	const openEditModal = (pot: PotType) => {
		setOpenModal({
			mode: "edit",
			open: true,
			pot: pot,
		});
	};
	const addNewPot = () => {
		setOpenModal((prev) => ({
			...prev,
			mode: "add",
			open: true,
			pot: null, // Reset pot to null for adding a new pot
		}));
	};

	return (
		<>
			<Title title="Pots" btn={true} btnText=" Add New Pot" onClick={addNewPot}>
				<Plus className="w-5 h-5 stroke-[4px] fill-fg" />
			</Title>

			<AddEditPotModal
				open={openModal.open}
				close={() => setOpenModal((prev) => ({ ...prev, open: false, pot: null }))}
				mode={openModal.mode}
				pot={openModal.pot}
			/>

			<section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center justify-start w-full">
				{pots.length > 0 ? (
					pots.map((pot) => <Pot key={pot.id} pot={pot} open={openEditModal} />)
				) : (
					<div className="flex-column gap-6 items-center justify-center  lg:col-span-2">
						<p className="text-h2 text-muted">You don&apos;t have any pots yet!</p>
						<button
							onClick={() => addNewPot()}
							className="btn btn-primary text-4 font-bold "
						>
							+ Add New Pot
						</button>
					</div>
				)}
			</section>
		</>
	);
}
