import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AboutMe from "./components/about/About";
import AdminRoute from "./AdminRoute";
import BlogSection from "./components/blog/BlogSection";
import BlogTable from "./components/dashboard/BlogsMngt/BlogsTable";
import ContactSection from "./components/contacts/Contact";
import ContactsManagementModule from "./components/dashboard/ContactsMngt/ContactsManagement";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardSummary from "./components/dashboard/DashboardSummary";
import EducationTableModule from "./components/dashboard/AboutMngt/EducationTable";
import ExperienceTableModule from "./components/dashboard/AboutMngt/ExperienceTable";
import Home from "./components/home/Home";
import Layout from "./Layout";
import LoginForm from "./components/userscomponent/Login";

import ProfileManagementModule from "./components/dashboard/AboutMngt/AboutManagement";
import ProjectTableModule from "./components/dashboard/ProjectsMngt/ProjectTable";
import ProjectsSection from "./components/projects/Projects";
import React, { useEffect } from "react";
import ReactGA from "react-ga4";
import ServiceManagementModule from "./components/dashboard/ServicesMngt/ServiceManagement";
import Services from "./components/services/Services";
import SignupForm from "./components/userscomponent/signup";
import SkillsTableModule from "./components/dashboard/AboutMngt/SkillsTable";
import Testimonial from "./components/testimonies/Testimonial";
import TestimonialsMngt from "./components/dashboard/TestimonyMngt/Testimonialmngt";
import UsersManagement from "./components/dashboard/users/UsersManagement";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Initialize Google Analytics with your Measurement ID
ReactGA.initialize("G-Y603TXHD3C"); // Replace G-XXXXXXX with your Measurement ID

// Track page views on route changes
const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);

  return null;
};

function App() {
  return (
    <Router>
      {/* Include Analytics to track page views */}
      <Analytics />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <>
                <Home />
                <ProjectsSection />
                <AboutMe />
  
                <Services />
                <Testimonial />
                <BlogSection />
                <ContactSection />
              </>
            }
          />
        </Route>
        <Route path="login" element={<LoginForm />} />
        <Route path="signup" element={<SignupForm />} />
        <Route
          path="/dashboard/*"
          element={
            <AdminRoute>
              <Routes>
                <Route path="/" element={<DashboardLayout />}>
                  <Route index element={<DashboardSummary />} />
                  <Route path="projects" element={<ProjectTableModule />} />
                  <Route path="contacts" element={<ContactsManagementModule />} />
                  <Route path="services" element={<ServiceManagementModule />} />
                  <Route path="about" element={<AboutMe />} />
                  <Route path="testimonials" element={<TestimonialsMngt />} />
                  <Route path="skills" element={<SkillsTableModule />} />
                  <Route path="education" element={<EducationTableModule />} />
                  <Route path="experience" element={<ExperienceTableModule />} />
                  <Route path="blogPostsManagement" element={<BlogTable />} />
                  <Route path="profile-management" element={<ProfileManagementModule />} />
                  <Route path="UsersManagement" element={<UsersManagement />} />
                </Route>
              </Routes>
            </AdminRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
