import multer from "multer";

const storage = multer.memoryStorage(); // Store the file in memory

const upload = multer({
	limits: { fileSize: 250 * 1024 }, // Limit to 250KB
	fileFilter: (req, file, cb) => {
		if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
			cb(null, true);
		} else {
			cb(new Error("Invalid file type. Only PNG and JPEG allowed."));
		}
	},
	storage,
});

export default upload;
