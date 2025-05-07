import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useProfileForm } from "../hooks/useProfileForm";
import AuthLayout from "../components/AuthLayout";
import FormInput from "../components/FormInput";
import ProfileIcon from "../assets/images/avatar-placeholder.svg?react";
import { setProfile } from "../redux/authSlice"; // Make sure this is the correct action
import InfoIcon from "../assets/images/info-circle.svg?react";

const SetProfilePage = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const { name, profileImg } = user;

	const formik = useProfileForm(
		({ name, profileImg }) => {
			console.log(name, profileImg);
			dispatch(
				setProfile({
					name,

					profileImg: profileImg?.file,
				})
			);
		},
		{
			name: name || "",
			profileImg: profileImg || "",
		}
	);

	const previewSrc =
		typeof formik.values.profileImg === "string"
			? formik.values.profileImg
			: formik.values.profileImg?.preview || ProfileIcon;

	return (
		<AuthLayout
			title="Personalize your experience"
			info="Add your name and a profile picture to make Mood yours."
			authKey="onboarding"
		>
			<FormInput
				name="name"
				id="name"
				value={formik.values.name}
				formik={formik}
				type="text"
				label="Name"
				placeholder="Jane Appleseed"
				error={formik.errors.name}
				touched={formik.touched.name}
			/>

			<div className="flex justify-start gap-5 w-full">
				{previewSrc && !formik.errors.profileImg ? (
					<img
						src={previewSrc}
						alt="Profile"
						className="w-16 h-16 rounded-full object-cover"
					/>
				) : (
					<ProfileIcon />
				)}

				<div className="flex flex-col gap-4 items-start flex-1">
					<div className="flex flex-col gap-1.5 w-full">
						<p className="text-6 regular">Upload Image</p>
						<p className="text-7 text-n-600">Max 250KB, PNG or JPEG</p>
					</div>

					<div className="flex flex-col gap-2 items-start">
						<div className="flex gap-2 items-center">
							<label htmlFor="profileImg" className="secondary-btn">
								Upload
								<input
									id="profileImg"
									name="profileImg"
									type="file"
									onChange={(e) => {
										const file = e.currentTarget.files[0];
										if (file) {
											formik.setFieldValue("profileImg", {
												preview: URL.createObjectURL(file),
												file,
											});
										}
									}}
									className="appearance-none hidden"
									accept=".png, .jpeg, .jpg"
								/>
							</label>

							{formik.values.profileImg?.file?.name && (
								<p className="text-7 font-semibold tracking-wider py-3 px-4 rounded-8 bg-blue-700/50 text-white">
									{formik.values.profileImg.file.name}
								</p>
							)}
						</div>

						{formik.touched.profileImg && formik.errors.profileImg && (
							<div className="flex items-center gap-1.5">
								<InfoIcon className="w-3 h-3" />
								<p className="text-red-700 text-9">{formik.errors.profileImg}</p>
							</div>
						)}
					</div>
				</div>
			</div>
			<button className="btn w-full text-5" type="submit" onClick={formik.handleSubmit}>
				Start Tracking
			</button>
		</AuthLayout>
	);
};

export default SetProfilePage;
