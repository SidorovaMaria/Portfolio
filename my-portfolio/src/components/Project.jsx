import React from "react";

const Project = ({ project }) => {
	return (
		<aside
			className="bg-background text-text p-5 max-w-1/3 flex flex-col justify-center items-center rounded-xl gap-x-4"
			tabIndex={0}
			aria-labelledby={`project-${project.title}-heading`}
			aria-describedby={`project-${project.title}-description`}
			aria-label={`Project ${project.title}`}
		>
			<img
				src={project.imgSrc}
				className="rounded-xl"
				alt={`Screenshot of ${project.title}`}
				tabIndex={0}
			/>
			<div className="flex gap-1 my-2 flex-col items-center text-center ">
				<h4 className="text-xl font-teko-semibold whitespace-nowrap">{project.title}</h4>
				<p className="font-teko-regular">{project.description}</p>
			</div>
		</aside>
	);
};

export default Project;
