import "./Services.css";
import CircularProgress from "@mui/material/CircularProgress";
import LoadingIndicator from "../../LoadingIndicator";
import React, { useEffect, useState } from "react";
import ServiceItem from "./ServiceItem";
import { getAllServices } from "../../apirequest/serviceApi";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const fetchedServices = await getAllServices();
        setServices(fetchedServices.data || []); 
        setLoading(false);// Ensure it's always an array
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        // Set loading to false after fetching
      }
    };
    fetchServices();
  }, []);


  return (
    <section id="services" className="section">
      <div className="container content-container">
        <h2 className="content-title">My Services</h2>
        <p className="content-subtitle">
          In today’s competitive landscape, success demands cutting-edge solutions. 
          <a href="#services" className="call-to-action-link"> Explore my services</a> 
          to discover how I can help you thrive. 
          <a href="#contacts" className="call-to-action-link"> Contact me</a> today, and let's make your business unstoppable!
        </p>

        {loading?(   <LoadingIndicator
            loadingMessage="Hold tight! We're fetching the latest services tailored for you."
            speedMessage="your internet speed"
            performanceMessage="device performance"
            additionalMessage="Thank you for your patience as we prepare valuable solutions for you!"
          />
      
    ):
          (<div className="services-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {services.map((service, index) => (
            <ServiceItem
              key={index}
              image={service.image}
              alt={service.alt}
              title={service.title}
              description={service.description}
              overlayTitle={service.overlayTitle}
              overlayDescription={service.overlayDescription}
              overlayLink={service.overlayLink}
            />
          ))}
        </div>)}
      </div>
    </section>
  );
};

export default Services;
