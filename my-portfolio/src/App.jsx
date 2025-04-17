import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Loader from "./components/Loader";
import Header from "./components/Header";
import Intro from "./components/Intro";
import MovingText from "./components/texts/MovingText";
import Project from "./components/Project";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";

function App() {
	const [loading, setLoading] = useState(true);

	return (
		<div className="">
			<AnimatePresence mode="wait">
				{loading ? (
					<motion.div key="loader" className="relative w-screen h-screen">
						<Loader setLoading={setLoading} />
					</motion.div>
				) : (
					<>
						<Header />

						<main className="mt-40 ">
							<MovingText>Portfolio 2025</MovingText>
							<Intro />
							<Projects />
							<TechStack />
						</main>
					</>
				)}
			</AnimatePresence>
		</div>
	);
}

export default App;
