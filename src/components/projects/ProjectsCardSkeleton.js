import "react-loading-skeleton/dist/skeleton.css";
import React from "react";
import Skeleton from "react-loading-skeleton";

const ProjectsCardSkeleton = () => {
  return (
    <div className="project-item p-2 rounded-xl shadow-xl bg-gradient-to-r from-[#2c2a2f] to-[#1c1b1f] flex flex-col duration-300 group">
      <div className="w-full h-[60%] overflow-hidden rounded-lg relative">
        <Skeleton 
          height="100%" 
          className="rounded-lg" 
          baseColor="#2c2a2f" 
          highlightColor="#3c3a3f" 
        />
      </div>
      <Skeleton width="80%" height={20} baseColor="#2c2a2f" highlightColor="#3c3a3f" />
      <div className="w-full mt-2 flex flex-col gap-4">
        <div className="flex items-start justify-between flex-col">
          {/* <Skeleton width="70%" height={20} baseColor="#2c2a2f" highlightColor="#3c3a3f" /> */}
       
          <div className="flex space-x-4">
            <Skeleton 
              circle 
              width={48} 
              height={48} 
              baseColor="#2c2a2f" 
              highlightColor="#3c3a3f" 
            />
            <Skeleton 
              circle 
              width={48} 
              height={48} 
              baseColor="#2c2a2f" 
              highlightColor="#3c3a3f" 
            />
          </div>
        </div>
    
        <Skeleton width="50%" height={20} baseColor="#2c2a2f" highlightColor="#3c3a3f" />
        <div className="flex flex-wrap gap-3 mt-1">
          {[...Array(3)].map((_, index) => (
            <Skeleton 
              key={index} 
              width={60} 
              height={24} 
              baseColor="#2c2a2f" 
              highlightColor="#3c3a3f" 
            />
          ))}
        </div>
        <Skeleton 
          count={3} 
          height={15} 
          className="mt-2" 
          baseColor="#2c2a2f" 
          highlightColor="#3c3a3f" 
        />
      </div>
    </div>
  );
};

export default ProjectsCardSkeleton;
