import React from "react";
import { BsGithub } from "react-icons/bs";
import { FaGlobe } from "react-icons/fa";

const ProjectsCard = ({ title, image, description, githubLink, visitLink, technologies}) => {
  return (
    <div className="project-item p-4 rounded-lg shadow-shadowOne flex flex-col duration-1000 ">
      <div className="w-full h-[60%] overflow-hidden rounded-lg">
        <img
          className="w-full h-full object-cover group-hover:scale-110 duration-300 cursor-pointer"
          src={image}
          alt="Project"
        />
      </div>
      <div className="w-full mt-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base uppercase text-designColor font-normal">{title}</h3>
          <div className="flex">
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                title="View on GitHub"
                rel="noopener noreferrer"
                className="text-lg w-10 h-10 rounded-full bg-black inline-flex justify-center items-center text-gray-400 hover:text-designColor duration-300 cursor-pointer"
              >
                <BsGithub />
              </a>
            )}
            {visitLink && (
              <a
                href={visitLink}
                title="Visit Website"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg w-10 h-10 rounded-full bg-black inline-flex justify-center items-center text-gray-400 hover:text-designColor duration-300 cursor-pointer"
              >
                <FaGlobe />
              </a>
            )}
          </div>
        </div>

        {/* Technologies Section */}
        {technologies && technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="text-xs font-medium bg-gray-200 text-gray-700 rounded-full py-1 px-3 hover:bg-gray-300 transition-all"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <p className="text-sm tracking-wide mt-3 hover:text-gray-100 duration-300 h-[120px] overflow-y-hidden">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ProjectsCard;
