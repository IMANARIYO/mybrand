import React from "react";
import { BsGithub } from "react-icons/bs";
import { FaGlobe } from "react-icons/fa";

const ProjectsCard = ({
  title,
  image,
  description,
  githubLink,
  visitLink,
  technologies,
}) => {
  return (
    <div className="project-item p-2 rounded-xl shadow-xl bg-gradient-to-r from-[#2c2a2f] to-[#1c1b1f] flex flex-col duration-300 group hover:scale-105 transform transition-transform">
      <div className="w-full h-[60%] overflow-hidden rounded-lg relative">
        <img
          className="w-full h-full object-cover group-hover:scale-110 duration-300 ease-in-out cursor-pointer rounded-lg shadow-md"
          src={image}
          alt="Project"
        />
        <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-0 transition-all duration-300 rounded-lg"></div>
      </div>
      <div className="w-full mt-2 flex flex-col gap-4">
        <div className="flex items-start justify-between flex-col">
          <h3 className="text-xl text-[#35a8f0] font-semibold uppercase tracking-wider">{title}</h3>
          <div className="flex space-x-4">
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                title="View on GitHub"
                rel="noopener noreferrer"
                className="text-lg w-12 h-12 rounded-full bg-[#333] inline-flex justify-center items-center text-gray-400 hover:text-[#ff6b6c] duration-300 cursor-pointer shadow-lg hover:shadow-2xl transition-all"
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
                className="text-lg w-12 h-12 rounded-full bg-[#333] inline-flex justify-center items-center text-gray-400 hover:text-[#ff6b6c] duration-300 cursor-pointer shadow-lg hover:shadow-2xl transition-all"
              >
                <FaGlobe />
              </a>
            )}
          </div>
        </div>
        <h4 className="text-lg font-semibold text-gray-300">Technologies Used</h4>
        {technologies && technologies.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-1">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="text-xs font-medium bg-[#3c3a3f] text-gray-300 rounded-md p-2 hover:bg-[#4d4b52] transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        <p className="text-sm text-gray-400 mt-4 hover:text-gray-200 duration-300 h-[120px] overflow-hidden transition-all">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ProjectsCard;
