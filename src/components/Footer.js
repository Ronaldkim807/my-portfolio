import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaArrowUp, FaHeart } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80; // Adjust for fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'Contact', id: 'contact' }
  ];

  const socialLinks = [
    { 
      icon: <FaGithub />, 
      url: 'https://github.com/Ronaldkim807', 
      label: 'GitHub',
      color: '#333'
    },
    { 
      icon: <FaLinkedin />, 
      url: 'https://linkedin.com/in/ronald-kimutai-172129345/', 
      label: 'LinkedIn',
      color: '#0077b5'
    },
    { 
      icon: <FaTwitter />, 
      url: 'https://twitter.com/', 
      label: 'Twitter',
      color: '#1da1f2'
    },
    { 
      icon: <FaEnvelope />, 
      url: 'mailto:ronaldkimutai48@gmail.com', 
      label: 'Email',
      color: '#ea4335'
    }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Brand Section */}
          <div className="footer-brand">
            <h3 className="footer-logo">Ronald<span>Kimutai</span></h3>
            <p className="footer-description">
              Full-Stack Developer & IT Student passionate about creating innovative 
              solutions and seamless user experiences.
            </p>
            <div className="footer-social">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={social.label}
                  style={{ '--social-color': social.color }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="footer-nav">
            <h4 className="footer-title">Navigation</h4>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={() => scrollToSection(link.id)}
                    className="footer-link"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="footer-contact">
            <h4 className="footer-title">Get In Touch</h4>
            <div className="contact-info">
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <span>ronaldkimutai48@gmail.com</span>
              </div>
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <span>kimutair123@gmail.com</span>
              </div>
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <span>Nairobi, Kenya</span>
              </div>
            </div>
          </div>

          {/* Back to Top Button - Desktop */}
          <button className="back-to-top desktop" onClick={scrollToTop} aria-label="Back to top">
            <FaArrowUp />
          </button>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>
              &copy; {currentYear} Ronald Kimutai. Made with <FaHeart className="heart-icon" /> 
              and lots of coffee
            </p>
          </div>
          
          {/* Back to Top Button - Mobile */}
          <button className="back-to-top mobile" onClick={scrollToTop} aria-label="Back to top">
            <FaArrowUp />
            <span>Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;