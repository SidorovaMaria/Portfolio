"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import IconCloseModal from "../svg/IconCloseModal";
import { Themes } from "../constants";
import IconCaretLeft from "../svg/IconCaretLeft";
import { AnimatePresence, motion } from "motion/react";
import IconWarning from "../svg/IconWarning";
import { useDispatch } from "react-redux";
import { modalContentVariant, ModalOverlayVariant } from "../constants/motionVariants";
interface PotModalProps {
	mode: string;
	potToEdit?: {
		id?: string;
		potName: string;
		potTarget: number;
		theme: { id: string; name: string; value: string };
	} | null;
	setOpenModal: React.Dispatch<
		React.SetStateAction<{
			open: boolean;
			mode: string;
		}>
	>;
}
const PotModal = ({ mode, potToEdit, setOpenModal }: PotModalProps) => {
	const potSchema = Yup.object({
		potName: Yup.string()
			.required("Pot name is required")
			.max(30, "Pot name must not exceed 30 characters")
			.min(3, "Pot name must be at least 3 characters"),
		potTarget: Yup.number()
			.required("Pot target is required")
			.positive("Pot target must be a positive number"),
	}).required();
	type potFormData = Yup.InferType<typeof potSchema>;
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		watch,
	} = useForm<potFormData>({
		resolver: yupResolver(potSchema),
		defaultValues: {
			potName: mode === "edit" ? potToEdit?.potName : "",
			potTarget: mode === "edit" ? potToEdit?.potTarget : 0,
		},
	});
	const [themesToggle, setThemesToggle] = useState(false);
	const [selectedTheme, setSelectedTheme] = useState(
		mode === "edit" ? potToEdit?.theme : Themes[0]
	);
	const dispath = useDispatch();

	const closeModal = () => {
		setOpenModal((prev) => ({
			...prev,
			open: false,
			mode: "",
		}));
	};
	const handleAddPot = (data: potFormData) => {
		const potData = {
			name: data.potName,
			target: data.potTarget,
			theme: selectedTheme,
		};
		if (mode === "add") {
			dispath({
				type: "finance/addPot",
				payload: potData,
			});
		} else if (mode === "edit") {
			dispath({
				type: "finance/editPot",
				payload: {
					potId: potToEdit?.id,
					name: data.potName,
					target: data.potTarget,
					theme: selectedTheme,
				},
			});
		}
		closeModal();
	};
	return (
		<motion.div
			initial={"initial"}
			animate={"show"}
			exit={"exit"}
			variants={ModalOverlayVariant}
			className="modal-overlay px-5 z-50"
		>
			<motion.div
				variants={modalContentVariant}
				className="modal-content w-full max-w-[560px] origin-top "
			>
				<div className="flex w-full items-center justify-between ">
					<h2 className="text-2 leading-120 font-bold">
						{mode === "add" ? "Add New Pot" : "Edit Pot"}
					</h2>
					<IconCloseModal
						className="cursor-pointer w-8 h-8 fill-grey-500 hover:fill-red-400 transition-colors duration-300"
						onClick={closeModal}
					/>
				</div>
				<p className="text-4 w-full text-grey-500 leading-150">
					{mode == "add"
						? "Create a pot to set savings targets. These can help keep you on track as you save for special purchases."
						: "If your saving targets change, feel free to update your pots."}
				</p>
				<form onSubmit={handleSubmit(handleAddPot)} className="flex flex-col gap-4 w-full">
					<div className="flex flex-col gap-1 w-full">
						<div className="flex w-full items-cenger justify-between">
							<label
								htmlFor="potName"
								className="text-5 font-bold leading-150 text-grey-500"
							>
								Pot Name
							</label>
							{errors?.potName && (
								<p className="text-5  text-red-500 font-bold leading-150 flex items-center gap-1">
									<IconWarning
										className="
                                    inline-flex  fill-red-500 "
									/>

									{errors.potName.message}
								</p>
							)}
						</div>
						<div
							className={`px-5 text-4 leading-150 py-3 rounded-8 bg-white border border-beige-500 flex-1 ${
								errors?.potName ? "border-red-500!" : ""
							}`}
						>
							<input
								type="text"
								id="potName"
								className="outline-none w-full "
								placeholder="e.g. Savings"
								{...register("potName")}
							/>
						</div>

						<p className="text-5 leading-150 text-grey-500 text-right">
							{30 - (watch("potName")?.length || 0)} characters left
						</p>
					</div>
					<div className="flex flex-col gap-1 w-full">
						<label
							htmlFor="potName"
							className="text-5 font-bold leading-150 text-grey-500"
						>
							Target
						</label>
						<div className="px-5 text-4 leading-150 py-3 rounded-8 bg-white border border-beige-500 has-focus-within:border-grey-900  flex items-center gap-3 relative">
							<span className=" text-grey-500">$</span>
							<input
								type="number"
								id="potTarget"
								className="outline-none flex-1 w-full"
								{...register("potTarget")}
							/>
						</div>
					</div>
					<div className="flex flex-col gap-1 w-full">
						<label
							htmlFor="potName"
							className="text-5 font-bold leading-150 text-grey-500"
						>
							Theme
						</label>
						<div className="px-5 text-4 leading-150 py-3 rounded-8 bg-white border border-beige-500 has-focus-within:border-grey-900 relative">
							<div className="flex items-center gap-3 w-full">
								<span
									className="w-4 h-4 rounded-full"
									style={{ backgroundColor: selectedTheme?.value }}
								/>
								<p className="text-grey-900 flex-1">{selectedTheme?.name} </p>
								<button
									type="button"
									className="w-4 h-4"
									onClick={() => setThemesToggle(!themesToggle)}
								>
									<IconCaretLeft className=" -rotate-90 fill-grey-900 w-3 h-3 cursor-pointer" />
								</button>
							</div>
							<AnimatePresence>
								{themesToggle && (
									<motion.aside
										initial={{ opacity: 0, scaleY: 0, y: -100 }}
										animate={{ opacity: 1, scaleY: 1, y: 0 }}
										exit={{ opacity: 0, scaleY: 0, y: -100 }}
										transition={{
											duration: 0.3,
											type: "spring",
											stiffness: 100,
										}}
										className="absolute  top-full w-full left-0 max-h-[150px] overflow-auto bg-white flex flex-col mt-1 shadow-[0px_4px_24px_rgba(0,0,0,0,0.25)] rounded-8 transition-colors duration-300"
									>
										{Themes.map((theme) => (
											<div
												key={theme.id}
												className="flex items-center gap-3 w-full cursor-pointer hover:bg-grey-300 px-5 py-3"
												onClick={() => {
													setSelectedTheme(theme);
													setThemesToggle(false);
												}}
											>
												<span
													className="w-4 h-4 rounded-full"
													style={{ backgroundColor: theme.value }}
												/>
												<p className="text-grey-900 flex-1">
													{theme.name}{" "}
												</p>
											</div>
										))}
									</motion.aside>
								)}
							</AnimatePresence>
						</div>
					</div>
					<button type="submit" className="btn btn-primary w-full py-4">
						{isSubmitting ? "Adding Pot..." : "Add Pot"}
					</button>
				</form>
			</motion.div>
		</motion.div>
	);
};

export default PotModal;
