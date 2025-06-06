import React from "react";

import { BudgetType, PotType } from "@/lib/features/financeSlice";

import { useDispatch } from "react-redux";
import Modal from "../Modal";
interface DeleteModalProps {
	close: () => void;
	item: PotType | BudgetType;
	mode: string;
	open: boolean;
}
const DeleteModal = ({ close, item, mode, open }: DeleteModalProps) => {
	const dispatch = useDispatch();
	const handleDelete = () => {
		if (mode === "pot") {
			dispatch({
				type: "finance/deletePot",
				payload: item.id,
			});
		} else if (mode === "budget") {
			dispatch({
				type: "finance/deleteBudget",
				payload: item.id,
			});
		}
		close();
	};
	return (
		<Modal
			close={close}
			open={open}
			title={`Delete "${
				mode === "pot" && "name" in item
					? item.name
					: "category" in item
					? item.category.name
					: ""
			}"
					?`}
		>
			<p className="text-p4 w-full text-muted ">
				{mode == "pot"
					? "Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever."
					: "Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever."}
			</p>
			<button onClick={handleDelete} className="btn btn-destroy w-full text-p4-bold">
				Yes, Confirm Deletion
			</button>
			<button className="btn btn-tertiary w-full text-4 p-0 font-normal" onClick={close}>
				No, Go Back
			</button>
		</Modal>
	);
};

export default DeleteModal;
