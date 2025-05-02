import React, { useEffect } from "react";
import AuthModal from "../../layout/AuthModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormInput from "../../components/FormInput";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/authSlice";
import { useNavigate } from "react-router";
const RegisterPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);
	const SignUpSchema = Yup.object().shape({
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
		validationSchema: SignUpSchema,
		onSubmit: (values) => {
			dispatch(register({ email: values.email, password: values.password }));
		},
	});
	useEffect(() => {
		if (user) {
			navigate("/");
		}
	}, [user]);
	return (
		<AuthModal
			title="Create Your Account"
			intro="Sign up to start organizing your notes and boost your productivity."
			authAction="Sign Up"
			account="Already have an account?"
			link="/login"
			linkText="Login"
		>
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
		</AuthModal>
	);
};

export default RegisterPage;
