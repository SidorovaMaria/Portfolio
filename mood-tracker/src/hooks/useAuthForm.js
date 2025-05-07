import { useFormik } from "formik";
import * as Yup from "yup";

export const useAuthForm = (onSubmit) => {
	return useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: Yup.object({
			email: Yup.string().email("Invalid email format").required("Email is required"),
			password: Yup.string()
				.min(8, "Password must be at least 8 characters")
				.required("Password is required"),
		}),
		onSubmit,
	});
};
