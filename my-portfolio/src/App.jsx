import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Loader from "./components/Loader";

function App() {
	const [loading, setLoading] = useState(true);

	return (
		<div className="relative w-screen h-screen overflow-hidden">
			<AnimatePresence mode="wait">
				{loading ? (
					<motion.div key="loader">
						<Loader setLoading={setLoading} />
					</motion.div>
				) : (
					<></>
				)}
			</AnimatePresence>
		</div>
	);
}

export default App;
