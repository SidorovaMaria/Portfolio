import React from "react";

const Project = ({ project }) => {
	return (
		<aside className="bg-background text-text p-5 max-w-1/3 grid grid-cols-[3fr_2fr] items-center rounded-xl gap-x-4">
			<img src={project.imgSrc} className="w-full rounded-2xl border-2" />
			<div className="flex gap-4 flex-col items-start ">
				<h4 className="text-2xl font-teko-semibold whitespace-nowrap">{project.title}</h4>
				<p className="font-light text-xl">{project.description}</p>
			</div>
		</aside>
	);
};

export default Project;
