import "./Project.css";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import LoadingIndicator from "../../LoadingIndicator";
import ProjectCard from "./ProjectCard";
import ProjectsCardSkeleton from "./ProjectsCardSkeleton";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { toast } from "react-toastify";
import { getAllProjects } from "../../apirequest/projectApi";
import { projectData } from "../data/projects";

const initialProject=projectData;
// Custom Next Arrow
function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div className="arrow arrow-next" onClick={onClick}>
      <HiArrowRight />
    </div>
  );
}

// Custom Prev Arrow
function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div className="arrow arrow-prev" onClick={onClick}>
      <HiArrowLeft />
    </div>
  );
}

const ProjectsSection = () => {
  const [dotActive, setDotActive] = useState(0);
  const [selectedTech, setSelectedTech] = useState("all"); // State to track the selected filter
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(true);
  // Function to handle tech filter changes
  const handleFilterChange = (e) => {
    setSelectedTech(e.target.value);
  };

  // Filter projects based on the selected tech
  const filteredProjects = projectData.filter((project) =>
    selectedTech === "all" ? true : project.techUsed === selectedTech
  );

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,

    autoplaySpeed: 2000,
    // cssEase: "linear",
    focusOnSelect: true,
    pauseOnHover: true,
    swipeToSlide: true,

    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    beforeChange: (prev, next) => setDotActive(next),
    appendDots: (dots) => (
      <div>
        <ul className="custom-dots">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        className={i === dotActive ? "dot active" : "dot"}
        style={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          cursor: "pointer",
          
          background: i === dotActive ? "#d0ff01" : "gray",
        }}
      ></div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getAllProjects();
        setProjectData(response.data);
        setLoading(false);
        console.log("projects fetched",response.data);
      } catch (error) {
        setLoading(true); 
        // toast.error("Failed to fetch projects.");
      }finally {
        // Set loading to false once data is fetched
        console.log("finished loading")
      }
    };

    fetchProjects();
  }, []);
  return (
    <section id="projects" className="section">
      <div className="container content-container">
        <h2 className="content-title">Featured Projects</h2>
        <p className="content-subtitle">
          Discover standout projects that blend creativity and innovation.
          <a href="#portfolio" className="call-to-action-link">Explore my work</a>
          and see how I can bring fresh ideas to life. Ready to collaborate?
          <a href="#contacts" className="call-to-action-link">Let’s connect!</a>
        </p>

        {/* Filter Section */}
        {/* <div className="filter-container">
          <label htmlFor="tech-filter">Filter by Technology:</label>
          <select
            id="tech-filter"
            className="filter-select"
            value={selectedTech}
            onChange={handleFilterChange}
          >
            <option value="all">All</option>
            <option value="html-css-js">HTML, CSS, JavaScript</option>
            <option value="react-node">React, Node.js</option>
            <option value="angular-node">Angular, Node.js</option>
            <option value="react-native">React Native</option>
          </select>
        </div> */}

        {/* Projects Container */}
       
        {loading ? (
        
      //   <LoadingIndicator
      //   loadingMessage="Hang tight! We’re retrieving some amazing projects for you."
      //   speedMessage="internet speed may affect loading time"
      //   performanceMessage="your device performance"
      //   additionalMessage="Thank you for your patience while we gather these inspiring works!"
      // />
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
            {/* Skeleton Cards */}
            {[...Array(4)].map((_, index) => (
              <ProjectsCardSkeleton key={index} />
            ))}
          </div>
 
      
        ) : (
          <Slider {...settings} className="mt-5 projects-container p-4">
          {filteredProjects.map((project) => {
            // Split the technologies string into an array
            const technologies = project.languageUsed[0].split(',').map((tech) => tech.trim());
        
            return (
              <ProjectCard
                key={project._id}
                image={project.image}
                title={project.projectName}
                description={project.description}
                githubLink={project.github}
                visitLink={project.projectLink}
                technologies={technologies} // Passing the split technologies array
              />
            );
          })}
        </Slider>
        
        )}
       
      </div>
    </section>
  );
};

export default ProjectsSection;
