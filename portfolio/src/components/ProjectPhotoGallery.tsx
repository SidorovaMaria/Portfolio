import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, wrap, motion } from "motion/react";
import { useState } from "react";
import ToolTip from "./ToolTip";
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
	return Math.abs(offset) * velocity;
};
interface Image {
	src: string;
	alt: string;
	device: string;
}
interface ProjectPhotoGalleryProps {
	images: Image[];
}

const ProjectPhotoGallery = ({ images }: ProjectPhotoGalleryProps) => {
	const [[image, direction], setPage] = useState([0, 0]);
	const imageIndex = wrap(0, images.length, image);
	const paginate = (newDirection: number) => {
		setPage([image + newDirection, newDirection]);
	};

	const [isOpen, setIsOpen] = useState(false);
	const handleClick = () => setIsOpen(true);
	const handleClose = () => setIsOpen(false);

	return (
		<aside className="grid grid-cols-[1fr_2fr_1fr] lg:grid-cols-1 items-center justify-center w-full max-h-[800px] ">
			<ToolTip text="Previous Image" position="mouse" className="lg:hidden">
				<ChevronLeft
					size={30}
					className="w-full text-coffe-light opacity-30 hover:opacity-100 hover:text-coffee-brown cursor-pointer hover:scale-110 active:scale-90 transition-all duration-300 ease-linear "
					onClick={() => paginate(-1)}
				/>
			</ToolTip>

			<AnimatePresence mode="wait" initial={false} custom={direction}>
				<motion.img
					layoutId={`image-${imageIndex}-${images[imageIndex].alt}`}
					key={image}
					src={images[imageIndex].src}
					alt={images[imageIndex].alt}
					custom={direction}
					variants={gallery}
					initial="enter"
					animate="center"
					exit="exit"
					onDoubleClick={handleClick}
					transition={{
						x: { type: "spring", stiffness: 300, damping: 30 },
						opacity: { duration: 0.2 },
					}}
					drag="x"
					dragConstraints={{ left: 0, right: 0 }}
					dragElastic={1}
					onDragEnd={(_event, { offset, velocity }) => {
						const swipe = swipePower(offset.x, velocity.x);
						if (swipe < -swipeConfidenceThreshold) {
							paginate(1);
						} else if (swipe > swipeConfidenceThreshold) {
							paginate(-1);
						}
					}}
					title="Double click to open"
					className="max-h-[280px] md:max-h-[320px] max-w-[400px] md:max-w-[550px] mx-auto cursor-grab lg:order-2"
				/>
			</AnimatePresence>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 pt-10"
						onClick={handleClose}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<motion.img
							layoutId={`image-${imageIndex}`}
							src={images[imageIndex].src}
							alt={images[imageIndex].alt}
							onDoubleClick={handleClose}
							onClick={(e) => e.stopPropagation()}
							className={`object-contain text-[8px] mx-auto ${
								images[imageIndex].device === "mobile"
									? "max-w-[40%]"
									: "max-w-[90%]"
							} `}
						/>
					</motion.div>
				)}
			</AnimatePresence>
			<ToolTip text="Next Image" position="mouse" className="lg:hidden">
				<ChevronRight
					size={30}
					className="w-full text-coffe-light opacity-30 hover:opacity-100 hover:text-coffee-brown cursor-pointer hover:scale-110 active:scale-90 transition-all duration-300 ease-linear "
					onClick={() => paginate(1)}
				/>
			</ToolTip>
		</aside>
	);
};

export default ProjectPhotoGallery;

const gallery = {
	enter: (direction: number) => ({
		opacity: 0,
		x: direction > 0 ? 300 : -300,
		scale: 0.95,
	}),
	center: {
		zIndex: 1,
		x: 0,
		opacity: 1,
		scale: 1,
		transition: {
			x: { type: "spring", stiffness: 260, damping: 30 },
			opacity: { duration: 0.3 },
			scale: { duration: 0.3 },
		},
	},
	exit: (direction: number) => ({
		zIndex: 0,
		x: direction < 0 ? 300 : -300,
		opacity: 0,
		scale: 0.95,
		transition: {
			x: { type: "spring", stiffness: 260, damping: 30 },
			opacity: { duration: 0.3 },
			scale: { duration: 0.2 },
		},
	}),
};
