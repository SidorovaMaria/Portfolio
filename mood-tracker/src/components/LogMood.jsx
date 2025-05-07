import { useFormik } from "formik";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";

import * as Yup from "yup";
import InfoIcon from "../assets/images/info-circle.svg?react";
import CheckIcon from "../assets/images/icon-check.svg?react";
import { moods, feelings, sleepDurations } from "../assets/helpData";
import { addMoodEntry } from "../redux/moodSlice";
import { useDispatch } from "react-redux";
const LogMood = ({ close }) => {
	const dispatch = useDispatch();
	const [currentStep, setCurrentStep] = useState(0);

	const nextStep = () => {
		setCurrentStep((prev) => prev + 1);
	};

	const formik = useFormik({
		initialValues: {
			mood: null,
			feelings: [],
			journalEntry: "",
			sleepHours: 0,
			createdAt: new Date().toISOString(),
		},
		validationSchema: Yup.object({
			mood: Yup.string().required("Please select a mood before continuing."),
			feelings: Yup.array()
				.of(Yup.string())
				.min(1, "Please select at least one feeling.")
				.max(3, "You can select up to 3 feelings."),
			journalEntry: Yup.string()
				.max(150, "Please keep your reflection under 150 characters.")
				.required("Please write a few words about your day before continuing."),
		}),
		onSubmit: (values) => {
			const moodEntry = {
				mood: values.mood,
				feelings: values.feelings,
				journalEntry: values.journalEntry,
				sleepHours: values.sleepHours,
				createdAt: values.createdAt,
			};
			dispatch(addMoodEntry(moodEntry));
			close();
		},
	});

	return (
		<motion.div className="fixed h-screen w-screen inset-0 flex items-center justify-center py-10 bg-black/70 z-30">
			<motion.div className=" mx-4 flex flex-col  gap-6 px-5 py-8 rounded-16 gradient w-full md:max-w-[600px]  md:mx-auto">
				<h2 className="text-[32px] md:text-[40px] md:leading-120 font-bold tracking-03 leading-140 text-n-900 w-full">
					Log your mood
				</h2>
				<div className="grid grid-cols-4 w-full gap-4">
					<div
						className={`h-1.5 rounded-full ${
							currentStep >= 0 ? "bg-blue-600" : "bg-blue-200"
						}`}
					></div>
					<div
						className={`h-1.5 rounded-full ${
							currentStep >= 1 ? "bg-blue-600" : "bg-blue-200"
						}`}
					></div>
					<div
						className={`h-1.5 rounded-full ${
							currentStep >= 2 ? "bg-blue-600" : "bg-blue-200"
						}`}
					></div>
					<div
						className={`h-1.5 rounded-full ${
							currentStep >= 3 ? "bg-blue-600" : "bg-blue-200"
						}`}
					></div>
				</div>
				<AnimatePresence>
					{currentStep === 0 && <MoodToday formik={formik} next={nextStep} />}
					{currentStep === 1 && <Feelings formik={formik} next={nextStep} />}
					{currentStep === 2 && <Reflection formik={formik} next={nextStep} />}
					{currentStep === 3 && <HoursSlept formik={formik} />}
				</AnimatePresence>
			</motion.div>
		</motion.div>
	);
};

export default LogMood;

const MoodToday = ({ formik, next }) => {
	return (
		<React.Fragment>
			<h1 className="text-3 text-n-900 w-full">How was your mood today?</h1>
			<div className="flex flex-col w-full gap-3">
				{moods.map(({ mood, icon: Icon, value }) => (
					<label
						key={mood}
						htmlFor={mood}
						className="flex items-center gap-3 px-5 py-3 rounded-10 bg-n-0 border-2 border-blue-100 cursor-pointer has-checked:border-blue-600 hover:bg-blue-100 hover:border-blue-600 group"
					>
						<div className="w-5 h-5 rounded-full border-[1.5px] border-blue-200 bg-n-0 has-checked:border-blue-600 has-checked:border-6 group-hover:border-blue-600 ">
							<input
								type="radio"
								name="mood"
								id={mood}
								value={value || mood}
								className="hidden peer"
								onChange={formik.handleChange}
							/>
						</div>
						<p className="flex-1 text-5 text-n-900 capitalize">{mood}</p>
						<Icon className="w-[38px] h-fit" />
					</label>
				))}
			</div>
			<div className="flex flex-col w-full gap-4">
				{formik.errors.mood && formik.touched.mood && (
					<article className="text-red-700 text-9 flex gap-1.5 items-center">
						<InfoIcon className="w-3 h-3" />

						{formik.errors.mood}
					</article>
				)}
				<button
					className="w-full btn text-4"
					onClick={async () => {
						const errors = await formik.validateForm();
						if (!errors.mood) {
							next();
						} else {
							formik.setTouched({ mood: true });
						}
					}}
				>
					Continue
				</button>
			</div>
		</React.Fragment>
	);
};

const Feelings = ({ formik, next }) => {
	return (
		<React.Fragment>
			<div className="flex flex-col gap-1.5 w-full">
				<h2 className="text-3 text-n-900">How did you feel?</h2>
				<p className="text-6 text-n-600">Select up to three tags:</p>
			</div>
			<div className="flex flex-wrap gap-x-4 gap-y-3">
				{feelings.map((feeling) => {
					const isChecked = formik.values.feelings.includes(feeling);
					return (
						<label
							key={feeling}
							htmlFor={feeling}
							className="flex gap-2 px-4 py-3 rounded-10 border-2 border-blue-100 cursor-pointer items-center has-checked:border-blue-600"
						>
							<div className="w-4 h-4 rounded-4 border border-blue-200 bg-n-0 has-checked:bg-blue-600! flex items-center justify-center">
								{isChecked && <CheckIcon />}
								<input
									name="feelings"
									type="checkbox"
									id={feeling}
									value={feeling}
									checked={isChecked}
									className="hidden peer"
									onChange={(e) => {
										const { checked } = e.target;
										const selected = formik.values.feelings;

										if (checked) {
											formik.setFieldValue("feelings", [
												...selected,
												feeling,
											]);
										} else {
											formik.setFieldValue(
												"feelings",
												selected.filter((f) => f !== feeling)
											);
										}
									}}
								/>
							</div>
							<p className="text-6 regular text-n-900 capitalize">{feeling}</p>
						</label>
					);
				})}
			</div>
			<div className="flex flex-col w-full gap-4">
				{formik.touched.feelings && formik.errors.feelings && (
					<article className="text-red-700 text-9 flex gap-1.5 items-center">
						<InfoIcon className="w-3 h-3" />

						{formik.errors.feelings}
					</article>
				)}
				<button
					className="w-full btn text-4"
					onClick={async () => {
						const errors = await formik.validateForm();
						if (!errors.feelings) {
							next();
						} else {
							formik.setTouched({ feelings: true });
						}
					}}
				>
					Continue
				</button>
			</div>
		</React.Fragment>
	);
};

const Reflection = ({ formik, next }) => {
	return (
		<React.Fragment>
			<h2 className="text-3 text-n-900">Write about your day...</h2>
			<div className="flex flex-col gap-2 w-full">
				<textarea
					name="journalEntry"
					id="journalEntry"
					rows={4}
					className="w-full py-3 px-4 rounded-10 border border-n-300 bg-n-0 placeholder:italic focus:outline-2 focus:border-transparent focus:outline-blue-600"
					placeholder="Today, I felt..."
					onChange={formik.handleChange}
				></textarea>
				<p
					className={`place-self-end text-n-600 text-8 ${
						formik.values.journalEntry.length > 150 ? "text-red-700" : ""
					}`}
				>
					{formik.values.journalEntry.length}/150
				</p>
			</div>
			<div className="flex flex-col w-full gap-4">
				{formik.touched.journalEntry && formik.errors.journalEntry && (
					<article className="text-red-700 text-9 flex gap-1.5 items-center">
						<InfoIcon className="w-3 h-3" />

						{formik.errors.journalEntry}
					</article>
				)}
				<button
					className="w-full btn text-4"
					onClick={async () => {
						const errors = await formik.validateForm();
						if (!errors.journalEntry) {
							next();
						} else {
							formik.setTouched({ journalEntry: true });
						}
					}}
				>
					Continue
				</button>
			</div>
		</React.Fragment>
	);
};

const HoursSlept = ({ formik }) => {
	return (
		<React.Fragment>
			<h2 className="text-3 text-n-900 w-full">How many hours did you sleep last night?</h2>
			<div className="flex flex-col gap-3 w-full">
				{sleepDurations.map(({ label, value }) => (
					<label
						key={label}
						htmlFor={label}
						className="flex items-center gap-3 px-5 py-3 rounded-10 bg-n-0 border-2 border-blue-100 cursor-pointer has-checked:border-blue-600 hover:bg-blue-100 hover:border-blue-600 group"
					>
						<div className="w-5 h-5 rounded-full border-[1.5px] border-blue-200 bg-n-0 has-checked:border-blue-600 has-checked:border-6 group-hover:border-blue-600 ">
							<input
								type="radio"
								name="sleepHours"
								id={label}
								value={value}
								className="hidden peer"
								onChange={formik.handleChange}
							/>
						</div>
						<p className="flex-1 text-5 text-n-900 capitalize">{label}</p>
					</label>
				))}
			</div>
			<div className="flex flex-col w-full gap-4">
				{formik.errors.sleepHours && formik.touched.sleepHours && (
					<article className="text-red-700 text-9 flex gap-1.5 items-center">
						<InfoIcon className="w-3 h-3" />

						{formik.errors.sleepHours}
					</article>
				)}
				<button
					className="w-full btn text-4"
					type="submit"
					onClick={async () => {
						const errors = await formik.validateForm();
						if (!errors.sleepHours) {
							formik.handleSubmit();
						} else {
							formik.setTouched({ sleepHours: true });
						}
					}}
				>
					Submit
				</button>
			</div>
		</React.Fragment>
	);
};
