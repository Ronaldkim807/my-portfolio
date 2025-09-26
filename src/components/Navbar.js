import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleRef = useRef(null);
  const menuRef = useRef(null);

  // Handle scroll to add scrolled class
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll(); // initialize
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open and handle escape/resize to close
  useEffect(() => {
    document.body.classList.toggle('menu-open', isMenuOpen);

    const handleKey = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };

    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKey);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('keydown', handleKey);
      window.removeEventListener('resize', handleResize);
      document.body.classList.remove('menu-open');
    };
  }, [isMenuOpen]);

  // Close menu when clicking outside (optional UX)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        toggleRef.current &&
        !menuRef.current.contains(e.target) &&
        !toggleRef.current.contains(e.target)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="nav-container">
        <div
          className="nav-logo"
          onClick={() => scrollToSection('home')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') scrollToSection('home');
          }}
        >
          Kimutai<span>.dev</span>
        </div>

        <div
          ref={menuRef}
          className={`nav-menu ${isMenuOpen ? 'active' : ''}`}
          aria-hidden={!isMenuOpen}
        >
          <div className="nav-link" onClick={() => scrollToSection('home')} role="button" tabIndex={0}>
            Home
          </div>
          <div className="nav-link" onClick={() => scrollToSection('about')} role="button" tabIndex={0}>
            About
          </div>
          <div className="nav-link" onClick={() => scrollToSection('projects')} role="button" tabIndex={0}>
            Projects
          </div>
          <div className="nav-link" onClick={() => scrollToSection('contact')} role="button" tabIndex={0}>
            Contact
          </div>
        </div>

        <button
          ref={toggleRef}
          className={`nav-toggle ${isMenuOpen ? 'active' : ''}`}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((s) => !s)}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
