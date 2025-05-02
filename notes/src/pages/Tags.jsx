import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import TagIcon from "../assets/images/icon-tag.svg?react";
import Tag from "./Tag";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
// ONLY Exist for tasblet and mobile screens
const Tags = () => {
	const { tags } = useSelector((state) => state.notes);
	return (
		<motion.section
			initial={{ opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -20 }}
			transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
			className="px-4 py-5 h-screen flex flex-col gap-4 w-full"
		>
			<h1 className="text-1">Tags</h1>
			<ul className="flex flex-col gap-1 rounded-t-8 ">
				{tags.map((tag, index) => (
					<React.Fragment key={tag.id}>
						<li key={tag.id}>
							<Link
								to={`/tags/${tag.id}`}
								className="flex py-2.5 gap-2 items-center rounded-8  hover:bg-n-200 dark:hover:bg-n-800 group px-2 border border-transparent hover:border-n-500 arrow-right dark:hover:border-n-600 text-n-700 dark:text-n-300"
							>
								<TagIcon />
								<p className=" text-4 group-hover:font-bold">{tag.name}</p>
							</Link>
						</li>
						<hr
							className={`border-n-200 dark:border-n-800 w-full ${
								index === tags.length - 1 && "hidden"
							}`}
						/>
					</React.Fragment>
				))}
			</ul>
		</motion.section>
	);
};

export default Tags;
