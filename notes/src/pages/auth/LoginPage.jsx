import React, { useEffect } from "react";
import AuthModal from "../../layout/AuthModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../components/FormInput";
import { login } from "../../redux/authSlice";
import { useNavigate } from "react-router";

const LoginPage = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const signInSchema = Yup.object().shape({
		email: Yup.string()
			.email("Please enter a valid email address.")
			.required("Email is required"),
		password: Yup.string().required("Password is required"),
	});
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: signInSchema,
		onSubmit: (values) => {
			dispatch(login({ email: values.email, password: values.password }));
		},
	});
	console.log(user);
	useEffect(() => {
		if (user) {
			navigate("/");
		}
	}, [user, dispatch, navigate]);
	return (
		<AuthModal
			title="Welcome to Note"
			intro="Please log in to continue"
			authAction="log in"
			account="No account yet?"
			link="/register"
			linkText="Sign Up"
		>
			{/* Inputs */}
			<form onSubmit={formik.handleSubmit} className="pt-6 flex flex-col gap-4 w-full">
				<FormInput
					label="Email Address"
					id="email"
					type="text"
					value={formik.values.email}
					formik={formik}
					error={formik.touched.email && formik.errors.email}
					name="email"
					placeholder="email@example.com"
					hint={formik.touched.email && formik.errors.email ? formik.errors.email : ""}
				/>
				<FormInput
					label="Password"
					id="password"
					type="password"
					value={formik.values.password}
					formik={formik}
					error={formik.touched.password && formik.errors.password}
					name="password"
					placeholder=""
					hint={
						formik.touched.password && formik.errors.password
							? formik.errors.password
							: ""
					}
				/>
				<button type="submit" className=" text-3 primary-btn-blue">
					Login
				</button>
			</form>
			{/* Or Login with google */}
		</AuthModal>
	);
};

export default LoginPage;
