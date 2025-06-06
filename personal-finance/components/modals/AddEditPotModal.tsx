import React, { useEffect } from "react";
import Modal from "../Modal";
import { PotType } from "@/lib/features/financeSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import IconWarning from "../svg/IconWarning";
import ModalDropDown from "./ModalDropDown";
import { Themes } from "../constants";
interface AddEditPotModalProps {
	close: () => void;
	open: boolean;
	mode: string;
	pot: PotType | null;
}
const AddEditPotModal = ({ close, open, mode, pot }: AddEditPotModalProps) => {
	const { pots, currency } = useSelector((state: RootState) => state.finance);
	const potSchema = Yup.object({
		name: Yup.string()
			.required("Pot name is required")
			.max(30, "Pot name must not exceed 30 characters")
			.min(3, "Pot name must be at least 3 characters")
			.test("unique-pot", "Pot with this name already exists", (value) => {
				if (mode === "add") {
					return !pots.some((p) => p.name.toLowerCase() === value?.toLowerCase());
				} else if (mode === "edit" && pot) {
					return !pots.some(
						(p) => p.name.toLowerCase() === value?.toLowerCase() && p.id !== pot.id
					);
				}
				return true;
			}),
		target: Yup.number()
			.typeError("Must be a number")
			.required("Pot target is required")
			.positive("Pot target must be a positive number"),
		theme: Yup.object({
			id: Yup.string().required("Theme ID is required"),
			name: Yup.string().required("Theme name is required"),
			value: Yup.string().required("Theme value is required"),
		})
			.required("Theme is required")
			.test(
				"theme-not-placeholder",
				"Please choose a theme",
				(value) => value?.id !== "1" //'1' is the placeholder ID for "Choose Theme"
			),
	});
	type PotFormData = Yup.InferType<typeof potSchema>;
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
		setValue,
	} = useForm<PotFormData>({
		resolver: yupResolver(potSchema),
		defaultValues: {
			name: "",
			target: 0,
			theme: { id: "1", name: "Choose Theme", value: "#000000" },
		},
	});
	const closeResetModal = () => {
		close();
		reset();
	};
	const dispatch = useDispatch();
	const handleSubmitPot = (data: PotFormData) => {
		const potData = {
			name: data.name,
			target: data.target,
			theme: data.theme,
		};
		const actionType = mode === "add" ? "finance/addPot" : "finance/editPot";
		const payload = mode === "edit" ? { potId: pot?.id, ...potData } : potData;
		dispatch({
			type: actionType,
			payload,
		});
		closeResetModal();
	};
	useEffect(() => {
		if (mode === "edit" && pot) {
			reset({
				name: pot.name,
				target: pot.target,
				theme: pot.theme,
			});
		} else if (mode === "add") {
			reset({
				name: "",
				target: 0,
				theme: { id: "1", name: "Choose Theme", value: "#000000" },
			});
		}
	}, [mode, pot, reset, open]);

	return (
		<Modal
			open={open}
			close={closeResetModal}
			title={mode === "add" ? "Add New Pot" : "Edit Pot"}
		>
			<p className="text-p4 text-muted w-full ">
				{mode == "add"
					? "Create a pot to set savings targets. These can help keep you on track as you save for special purchases."
					: "If your saving targets change, feel free to update your pots."}
			</p>
			<form
				onSubmit={handleSubmit(handleSubmitPot)}
				id="add-edit-pot-form"
				className="flex-column gap-4 "
			>
				{/* Pot Name */}
				<div className="flex-column gap-1 ">
					<label htmlFor="potName" className="flex-between">
						<span className="text-p5-bold text-muted">Pot Name</span>
						{errors?.name && (
							<span className="error-message">
								<IconWarning
									className="
                                    inline-flex  fill-red-500 "
								/>

								{errors.name.message}
							</span>
						)}
					</label>
					<div
						className={`input-container has-disabled:opacity-50 ${
							errors?.name ? "border-red-500!" : ""
						}`}
					>
						<input
							disabled={mode === "edit"}
							type="text"
							id="potName"
							className="outline-none w-full "
							placeholder="e.g. Savings"
							{...register("name")}
						/>
					</div>

					<p className="text-p5 text-muted text-right">
						{30 - (watch("name")?.length || 0)} characters left
					</p>
				</div>
				{/* Target */}
				<div className="flex-column gap-1 ">
					<label htmlFor="potTarget" className="flex-between">
						<span className="text-p5-bold text-muted">Target</span>
						{errors?.target && (
							<span className="error-message">
								<IconWarning
									className="
                                    inline-flex  fill-red-500 "
								/>

								{errors.target.message}
							</span>
						)}
					</label>
					<div className={`input-container ${errors?.target ? "border-red-500!" : ""}`}>
						<span className="text-border dark:text-muted-alt">{currency}</span>
						<input
							type="number"
							id="potTarget"
							className="outline-none flex-1 w-full"
							{...register("target")}
						/>
					</div>
				</div>
				<ModalDropDown
					error={errors.theme?.message}
					optionType="themes"
					label="Theme"
					options={Themes}
					selected={watch("theme")}
					setSelected={(theme) =>
						setValue(
							"theme",
							theme as {
								id: string;
								name: string;
								value: string;
							}
						)
					}
				/>
			</form>
			<button type="submit" form="add-edit-pot-form" className="btn btn-primary w-full py-4">
				{mode === "add" ? "Add Pot" : "Update Pot"}
			</button>
		</Modal>
	);
};

export default AddEditPotModal;
