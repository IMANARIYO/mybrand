import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

const LoadingIndicator = ({
  loadingMessage = "Hang on! We’re loading your content. Sometimes it takes a bit longer due to",
  speedMessage = "internet speed",
  performanceMessage = "device performance",
  additionalMessage = "Meanwhile, feel free to explore other sections or reach out to me directly!",
  experienceButtonText = "View My Experience",
  contactButtonText = "Contact Me Directly",
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full  bg-gray-50 rounded-lg shadow-lg p-4 sm:p-6 md:p-8 lg:p-10 space-y-4 md:space-y-5 lg:space-y-6 h-full">
      {/* Circular Progress Bar */}
      <CircularProgress size={200} className="text-green-500" />

      {/* Engaging Loading Message */}
      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 text-center font-semibold">
        {loadingMessage} <span className="text-blue-600 font-bold">{speedMessage}</span> or <span className="text-blue-600 font-bold">{performanceMessage}</span>. Thanks for your patience!
      </p>

      {/* Additional Engaging Message */}
      <h3 className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 text-center font-medium">
        {additionalMessage}
      </h3>

      {/* Interactive Navigation Buttons */}
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        {/* Button to Experience Section */}
        <a
          href="#experience"
          className="flex justify-center items-center px-3 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 ease-in-out text-xs sm:text-sm md:text-base"
        >
          {experienceButtonText}
        </a>

        {/* Button to Contact Section */}
        <a
          href="#contacts"
          className="flex justify-center items-center px-3 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300 ease-in-out text-xs sm:text-sm md:text-base"
        >
          {contactButtonText}
        </a>
      </div>

      {/* A Playful Note to Keep Them Engaged */}
      <p className="text-xs sm:text-sm md:text-base text-gray-500 text-center">
        I might just be the missing piece you’ve been looking for. Let’s create something amazing together!
      </p>
    </div>
  );
};

export default LoadingIndicator;
