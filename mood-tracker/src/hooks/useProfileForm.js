import { useFormik } from "formik";
import * as Yup from "yup";

const MAX_FILE_SIZE = 256000; // 250KB
const SUPPORTED_FORMATS = ["image/jpeg", "image/png"];
export const useProfileForm = (onSubmit, initialValues) => {
	return useFormik({
		initialValues: {
			name: initialValues?.name || "",
			profileImg: initialValues?.profileImg || null,
		},
		validationSchema: Yup.object({
			name: Yup.string().required("Please provide a name/username"),
			profileImg: Yup.mixed()
				.required("Profile image is required")
				.test("fileSize", "File too large. Max size is 250KB", (value) => {
					return value && value.file && value.file.size <= MAX_FILE_SIZE;
				})
				.test(
					"fileFormat",
					"Unsupported file type. Please upload a PNG or JPEG",
					(value) => {
						return value && value.file && SUPPORTED_FORMATS.includes(value.file.type);
					}
				),
		}),
		onSubmit,
	});
};
