import React from "react";
import { motion } from "motion/react";
import LeftSide from "../layout/LeftSide";
import RightSide from "../layout/RightSide";
const Settings = () => {
	return (
		<motion.section className="flex">
			<LeftSide></LeftSide>
			<RightSide></RightSide>
		</motion.section>
	);
};

export default Settings;
