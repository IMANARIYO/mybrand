import "./Services.css";
import React, { useEffect, useState } from "react";
import ServiceItem from "./ServiceItem";
import { getAllServices } from "../../apirequest/serviceApi";
import { serviceData } from "../data/services";

  

const Services = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const fetchedServices = await getAllServices();
        setServices(fetchedServices.data || []);  // Ensure it's always an array
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);
  return (
    <section id="services" className="section">
      <div className="container content-container">
        <h2 className="content-title">My Services</h2>
        <p className="content-subtitle">
          Success in the modern world requires cutting-edge solutions.
          <a href="#services" className="call-to-action-link">Explore my services</a>
          and see how I can help you thrive.
          <a href="#contacts" className="call-to-action-link">Contact me</a> today and let's make your business unstoppable!
        </p>

        <div className="services-container">
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
        </div>
      </div>
    </section>
  );
};

export default Services;
