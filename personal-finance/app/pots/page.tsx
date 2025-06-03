"use client";
import PotModal from "@/components/modals/PotModal";
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
		potToEdit?: null | {
			id?: string;
			potName: string;
			potTarget: number;
			theme: { id: string; name: string; value: string };
		};
	}>({
		mode: "",
		open: false,
		potToEdit: null,
	});
	const openEditModal = (pot: PotType) => {
		setOpenModal({
			mode: "edit",
			open: true,
			potToEdit: {
				id: pot.id || "",
				potName: pot.name,
				potTarget: pot.target,
				theme: { id: pot.theme.id, name: pot.theme.name, value: pot.theme.value },
			},
		});
	};
	const addNewPot = () => {
		setOpenModal((prev) => ({
			...prev,
			mode: "add",
			open: true,
			potToEdit: null,
		}));
	};

	return (
		<>
			<Title title="Pots" btn={true} btnText=" Add New Pot" onClick={addNewPot}>
				<Plus className="w-5 h-5 stroke-[4px] fill-white" />
			</Title>

			<PotModal
				open={openModal.open}
				mode={openModal.mode}
				setOpenModal={setOpenModal}
				potToEdit={openModal.potToEdit}
			/>

			<section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center justify-start w-full">
				{pots.length > 0 ? (
					pots.map((pot) => <Pot key={pot.id} pot={pot} open={openEditModal} />)
				) : (
					<div className="w-full flex flex-col gap-6 items-center justify-center">
						<p className="text-2 font-bold text-grey-500">
							You don&apos;t have any pots yet!
						</p>
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
