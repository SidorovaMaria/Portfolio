import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Loader from "./components/Loader";
import Header from "./components/Header";
import Intro from "./components/Intro";
import MovingText from "./components/texts/MovingText";

function App() {
	const [loading, setLoading] = useState(true);

	return (
		<div className="">
			<AnimatePresence mode="wait">
				{loading ? (
					<motion.div
						key="loader"
						className="relative w-screen h-screen"
					>
						<Loader setLoading={setLoading} />
					</motion.div>
				) : (
					<>
						<Header />

						<main className="mt-40 space-y-20">
							<MovingText>Portfolio 2025</MovingText>
							<Intro />
						</main>
					</>
				)}
			</AnimatePresence>
		</div>
	);
}

export default App;
