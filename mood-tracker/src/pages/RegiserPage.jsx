import React from "react";

import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { signup } from "../redux/authSlice";
import AuthLayout from "../components/AuthLayout";
import { useAuthForm } from "../hooks/useAuthForm";
import FormInput from "../components/FormInput";
import Loading from "../components/Loading";

const RegisterPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const formik = useAuthForm(async (values, { setSubmitting, setFieldError }) => {
		try {
			// Dispatch signup action
			await dispatch(signup(values)).unwrap();
			navigate("/setProfile"); // Redirect after successful registration
		} catch (errMsg) {
			setFieldError("email", errMsg);
		} finally {
			setSubmitting(false); // Stop submitting state
		}
	});

	return (
		<AuthLayout
			title="Create an account"
			info="Join to track your daily mood and sleep with ease."
			authKey="sign-up"
		>
			{formik.isSubmitting ? (
				<>
					<Loading />
				</>
			) : (
				<>
					<form
						id="registerForm"
						onSubmit={formik.handleSubmit}
						className="flex flex-col gap-5 w-full"
					>
						<FormInput
							id={"email"}
							type="text"
							name={"email"}
							label="Email address"
							placeholder="name@mail.com"
							formik={formik}
							error={formik.errors.email}
							value={formik.values.email}
							touched={formik.touched.email}
						/>
						<FormInput
							type="password"
							id={"pasword"}
							name={"password"}
							label="Password"
							placeholder=""
							formik={formik}
							value={formik.values.password}
							error={formik.errors.password}
							touched={formik.touched.password}
						/>
					</form>
					<div className="flex flex-col gap-5 w-full">
						<button className="btn w-full text-5" form="registerForm" type="submit">
							Sign Up
						</button>
						<p className="text-6 regular text-n-600 text-center cursor-default">
							Already got an account?{" "}
							<Link
								to="/signIn"
								className="text-blue-600 hover:text-blue-700 hover:underline "
							>
								Log In.
							</Link>
						</p>
					</div>
				</>
			)}
		</AuthLayout>
	);
};

export default RegisterPage;
