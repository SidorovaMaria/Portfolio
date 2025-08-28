import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { AnimatePresence, wrap, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
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
  height?: {
    base?: string;
    md?: string;
    lg?: string;
  };
}
const defaultHeights = {
  base: "h-[240px]",
  md: "md:h-[330px]",
  lg: "lg:h-[330px]",
} as const;
const ProjectPhotoGallery = ({
  images,
  height = defaultHeights,
}: ProjectPhotoGalleryProps) => {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const imageIndex = wrap(0, images.length, page);
  const current = images[imageIndex];
  const currentLayoutId = useMemo(
    () => `image-${imageIndex}-${current.alt}`,
    [imageIndex, current.alt]
  );
  const paginate = useCallback((newDirection: number) => {
    setPage(([p]) => [p + newDirection, newDirection]);
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  // Keyboard controls (left/right arrows, Esc)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") paginate(1);
      else if (e.key === "ArrowLeft") paginate(-1);
      else if (e.key === "Escape" && isOpen) close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paginate, isOpen, close]);

  const heights = {
    base: height?.base ?? defaultHeights.base,
    md: height?.md ?? defaultHeights.md,
    lg: height?.lg ?? defaultHeights.lg,
  };

  return (
    <aside
      className="grid grid-cols-[1fr_3fr_1fr] lg:grid-cols-1 items-center justify-center w-full max-h-[800px] "
      aria-roledescription="carousel"
      aria-label="Project image gallery"
    >
      <ToolTip text="Previous Image" position="mouse" className="lg:hidden">
        <ChevronLeft
          type="button"
          aria-label="Previous Image"
          size={30}
          className="w-full text-coffe-light opacity-30 hover:opacity-100 hover:text-coffee-brown cursor-pointer hover:scale-110 active:scale-90 transition-all duration-300 ease-linear "
          onClick={() => paginate(-1)}
        />
      </ToolTip>
      <div
        className={`relative w-full ${heights.base} ${heights.md} ${heights.lg} overflow-hidden rounded-2xl lg:order-2 flex items-center justify-center bg-gradient-to-b from-transparent to-coffe-light/40`}
      >
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.img
            layoutId={currentLayoutId}
            key={page}
            src={images[imageIndex].src}
            alt={images[imageIndex].alt}
            draggable="false"
            custom={direction}
            variants={gallery}
            initial="enter"
            animate="center"
            exit="exit"
            onDoubleClick={open}
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
            className="max-h-[220px] md:max-h-[320px] max-w-[260px] md:max-w-[400px] mx-auto cursor-grab active:cursor-grabbing lg:order-2 "
          />
          <button
            type="button"
            aria-label="Open full-screen"
            onClick={open}
            className="absolute cursor-pointer right-0 top-0 z-10 rounded-full overflow-hidden"
          >
            <Maximize2
              size={32}
              className="bg-gradient-to-bl from-bg-dark-coffee to-coffe-light p-2 opacity-80 hover:opacity-100  hover:scale-110  transition-all duration-200"
            />
          </button>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 pt-10"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              layoutId={currentLayoutId}
              src={current.src}
              alt={current.alt}
              onDoubleClick={close}
              draggable="false"
              onClick={(e) => e.stopPropagation()}
              className={`object-contain text-[8px] mx-auto ${
                current.device === "mobile"
                  ? "max-w-[40%] md:max-w-[30%] lg:max-w-[20%]"
                  : "max-w-[90%] lg:max-w-[70%]"
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
