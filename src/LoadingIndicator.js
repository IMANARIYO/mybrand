import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

// LoadingIndicator.js

const LoadingIndicator = ({
  loadingMessage = "Hang on! We’re loading your services. Sometimes it takes a bit longer due to",
  speedMessage = "internet speed",
  performanceMessage = "device performance",
  additionalMessage = "Meanwhile, feel free to explore my skills or reach out to me directly!",
  experienceButtonText = "View My Experience",
  contactButtonText = "Contact Me Directly",
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg shadow-lg p-6 space-y-4">
      {/* Circular Progress Bar */}
      <CircularProgress size={60} className="text-green-500" />

      {/* Engaging Loading Message */}
      <p className="text-lg text-gray-700 text-center font-semibold">
        {loadingMessage} <span className="text-blue-600 font-bold">{speedMessage}</span> or <span className="text-blue-600 font-bold">{performanceMessage}</span>. Thanks for your patience!
      </p>

      {/* Additional Engaging Message */}
      <h3 className="text-md text-gray-600 text-center font-medium">
        {additionalMessage}
      </h3>

      {/* Interactive Navigation Buttons */}
      <div className="flex space-x-4">
        {/* Button to Experience Section */}
        <a
          href="#experience"
          className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          {experienceButtonText}
        </a>

        {/* Button to Contact Section */}
        <a
          href="#contacts"
          className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300 ease-in-out"
        >
          {contactButtonText}
        </a>
      </div>

      {/* A Playful Note to Keep Them Engaged */}
      <p className="text-sm text-gray-500 text-center">
        I might just be the missing piece you’ve been looking for. Let’s create something amazing together!
      </p>
    </div>
  );
};

export default LoadingIndicator;
