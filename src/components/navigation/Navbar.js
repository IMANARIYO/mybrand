import "react-toastify/dist/ReactToastify.css";
import "./Navbar.css";
import React, { useEffect, useState } from "react";
import api from "../../apirequest/api";
import { FaBars, FaSignInAlt, FaTimes, FaUserCircle, FaUserPlus } from "react-icons/fa";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const [isSignupFormOpen, setIsSignupFormOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullNames, setFullNames] = useState('');
  const [loginError, setLoginError] = useState(null);
  const [signupError, setSignupError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const storedRole = localStorage.getItem('userRole');
    if (token && storedRole) {
      setIsLoggedIn(true);
      setUserRole(storedRole);
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prevState => !prevState);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const sections = ["home", "about", "projects", "services", "testimonial", "blog", "contacts"];
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setIsScrolled(scrollPosition > 50);

    let currentSection = 'home';
    sections.forEach((section) => {
      const sectionElement = document.getElementById(section);
      if (sectionElement && sectionElement.offsetTop <= scrollPosition + 100) {
        currentSection = section;
      }
    });
    setActiveItem(currentSection);
    sections.forEach((section) => {
      const menuItem = document.querySelector(`a[href="#${section}"]`);
      if (menuItem) {
        if (section === currentSection) {
          menuItem.classList.add('active');
        } else {
          menuItem.classList.remove('active');
        }
      }
    });
  };

  const handleLogin = async () => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const data = response.data;

      toast.success('Login successful!');
      localStorage.setItem('accessToken', data.access_token);
      localStorage.setItem('userId', data.user._id);
      localStorage.setItem('userRole', data.user.role);
      localStorage.setItem('user', JSON.stringify(data.user));

      setIsLoggedIn(true);
      setUserRole(data.user.role);
      setIsLoginFormOpen(false);
      setLoginError(null);
    } catch (error) {
      setLoginError("Invalid email or password");
      console.error("Login failed", error);
    }
  };

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setSignupError("Passwords do not match");
      return;
    }

    try {
      const response = await api.post('/auth/signup', { fullNames, email, password });
      const data = response.data;

      localStorage.setItem('accessToken', data.access_token);
      localStorage.setItem('userId', data.user._id);
      localStorage.setItem('userRole', data.user.role);
      localStorage.setItem('user', JSON.stringify(data.user));

      setIsLoggedIn(true);
      setUserRole(data.user.role);
      setIsSignupFormOpen(false);
      setSignupError(null);
      toast.success('Signup successful!');
    } catch (error) {
      setSignupError("Signup failed, try again");
      console.error("Signup failed", error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    setShowProfileMenu(false);
    toast.info("Logged out successfully!");
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} section`}>
      <div className="logo">
        <img src="/images/iblogo.png" alt="IMANARIYO Baptiste" />
      </div>
      <div className={`menu ${isMobileMenuOpen ? 'show' : ''} flex flex-col md:flex-row md:items-center`}>
        {['Home', 'About', 'Projects', 'Services', 'Testimonial', 'Blog', 'Contacts'].map((item, index) => (
          <a
            key={index}
            href={`#${item.toLowerCase()}`}
            className={`menu-item ${activeItem === item ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            {item}
          </a>
        ))}
        <div className="menu-item auth-menu">
          {!isLoggedIn ? (
            <>
              <a href="#" className="menu-item" onClick={() => setIsLoginFormOpen(true)}>
                <FaSignInAlt /> Login
              </a>
              <a href="#" className="menu-item" onClick={() => setIsSignupFormOpen(true)}>
                <FaUserPlus /> Signup
              </a>
            </>
          ) : (
            <>
              <div className="menu-item profile-item" onClick={() => setShowProfileMenu(!showProfileMenu)}>
                <FaUserCircle /> Profile
              </div>
              {showProfileMenu && (
                <div className="profile-dropdown absolute bg-white shadow-md rounded mt-2">
                  {userRole === 'admin' && (
                    <a href="dashboard" onClick={closeMobileMenu}>
                      Dashboard
                    </a>
                  )}
                  <a href="#settings" onClick={closeMobileMenu}>
                    Settings
                  </a>
                  <a href="#" onClick={handleLogout}>
                    Logout
                  </a>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <button className="mobile-menu-btn md:hidden" aria-label="Toggle menu" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Login Form Modal */}
      {isLoginFormOpen && (
        <div className="fixed top-0 left-0 w-full h-[100vh]  flex items-center justify-center bg-black bg-opacity-75 ">
          <div className=" bg-white p-5 rouned shadow-lg text-gray-950 w-11/12 md:w-1/3 mx-auto">
            <h2 className="text-2xl mb-4">Login</h2>
            {loginError && <p className="text-red-500">{loginError}</p>}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-2 mb-4 w-full rounded text-gray-950"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-2 mb-4 w-full rounded text-gray-950"
            />
            <button onClick={handleLogin} className="bg-blue-500 text-white py-2 px-4 rounded w-full">
              Login
            </button>
            <button onClick={() => setIsSignupFormOpen(true)} className="bg-green-500 text-white py-2 px-4 rounded w-full mt-2">
              Sign Up
            </button>
            <button onClick={() => setIsLoginFormOpen(false)} className="bg-gray-500 text-white py-2 px-4 rounded w-full mt-2">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Signup Form Modal */}
      {isSignupFormOpen && (
        <div className="fixed top-0 left-0 w-full h-[100vh] flex items-center justify-center bg-black bg-opacity-75 ">
          <div className=" relative bg-white p-5 rounded shadow-lg w-11/12 md:w-1/3">
            <h2 className="text-2xl mb-4 text-gray-950">Sign Up</h2>
            {signupError && <p className="text-red-500">{signupError}</p>}
            <input
              type="text"
              placeholder="Full Name"
              value={fullNames}
              onChange={(e) => setFullNames(e.target.value)}
              className="border border-gray-300 p-2 mb-4 w-full rounded text-gray-950"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-2 mb-4 w-full rounded text-gray-950"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-2 mb-4 w-full rounded text-gray-950"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-gray-300 p-2 mb-4 w-full rounded text-gray-950"
            />
            <button onClick={handleSignup} className="bg-blue-500 text-white py-2 px-4 rounded w-full">
              Sign Up
            </button>
            <button onClick={() => setIsLoginFormOpen(true)} className="bg-green-500 text-white py-2 px-4 rounded w-full mt-2">
              Login
            </button>
            <button onClick={() => setIsSignupFormOpen(false)} className="bg-gray-500 text-white py-2 px-4 rounded w-full mt-2">
              Cancel
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
