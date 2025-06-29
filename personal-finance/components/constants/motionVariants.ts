export const ModalOverlayVariant = {
	initial: {
		opacity: 0,
	},
	show: {
		opacity: 1,
		transition: {
			duration: 0.3,
			type: "spring",
			stiffness: 100,
		},
	},
	exit: {
		opacity: 0,
		transition: {
			duration: 0.3,
			type: "spring",
			stiffness: 100,
		},
	},
};
export const modalContentVariant = {
	initial: {
		opacity: 0,
		scale: 0.8,
	},
	show: {
		opacity: 1,
		scale: 1,
		transition: {
			type: "spring",
			stiffness: 260,
			damping: 20,
		},
	},
	exit: {
		opacity: 0,
		scale: 0.9,
		transition: {
			duration: 0.2,
			ease: "easeInOut",
		},
	},
};

export const selectDropDownVariant = {
	hidden: {
		opacity: 0,
		scaleY: 0,
		y: -100,
	},
	show: {
		opacity: 1,
		scaleY: 1,
		y: 0,
	},
	exit: {
		opacity: 0,
		scaleY: 0,
		y: -100,
	},
};

export const DesktopNavBarVariants = {
	full: {
		width: "300px",
		transition: { duration: 0.3 },
	},
	minimized: {
		width: "80px",
		transition: { duration: 0.3 },
	},
};
export const LinkVariant = {
	show: {
		width: "100%",
		transition: { duration: 0.3 },
	},
	hide: {
		width: "60px",
		transition: { duration: 0.3 },
	},
};
export const navText = {
	hide: {
		opacity: 0,

		transition: {
			duration: 0.3,
		},
	},
	show: {
		opacity: 1,
		transition: { duration: 0.3 },
	},
};
export const MinimizeIconVariants = {
	show: {
		rotate: 0,
		transition: { duration: 0.3 },
	},
	hide: {
		rotate: 180,
		transition: { duration: 0.3 },
	},
};
