import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../redux/authSlice";
import AuthLayout from "../components/AuthLayout";
import { useAuthForm } from "../hooks/useAuthForm";
import FormInput from "../components/FormInput";
import { Link, useNavigate } from "react-router";
import Loading from "../components/Loading";
const LoginPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const formik = useAuthForm(async (values, { setSubmitting }) => {
		try {
			await dispatch(login(values)).unwrap();
			navigate("/");
		} catch (err) {
			console.error("Login error:", err);
		} finally {
			setSubmitting(false);
		}
	});

	return (
		<AuthLayout
			title="Welcome back!"
			info=" Log in to continue tracking your mood and sleep."
			authKey="sign-in"
		>
			{formik.isSubmitting ? (
				<Loading />
			) : (
				<form
					id="LoginForm"
					onSubmit={formik.handleSubmit}
					className="flex flex-col gap-5 w-full"
				>
					<FormInput
						id={"email"}
						type="text"
						name={"email"}
						value={formik.values.email}
						label="Email address"
						placeholder="name@mail.com"
						formik={formik}
						error={formik.errors.email}
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
					<div className="flex flex-col gap-5 w-full">
						<button className="btn w-full text-5" form="LoginForm" type="submit">
							Log In
						</button>
						<p className="text-6 regular text-n-600 text-center cursor-default">
							Haven't got an account?{" "}
							<Link
								to="/signUp"
								className="text-blue-600 hover:text-blue-700 hover:underline "
							>
								Sign up.
							</Link>
						</p>
					</div>
				</form>
			)}
		</AuthLayout>
	);
};

export default LoginPage;
