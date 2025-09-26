import React, { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
  const [displayText, setDisplayText] = useState('');
  const [displayRole, setDisplayRole] = useState('');
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  const fullText = "Ronald (Kiptulwo) Kimutai";

 
 

  // Typewriter effect for the name
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [fullText]);

  // Cycle through roles safely
  useEffect(() => {
    const roles = [
      "IT Specialist",
      "Software Engineer",
      "Tech Enthusiast",
      "Problem Solver"
    ];

    const roleInterval = setInterval(() => {
      const role = roles[currentRoleIndex];
      let charIndex = 0;

      const typing = setInterval(() => {
        if (charIndex <= role.length) {
          setDisplayRole(role.slice(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typing);

          // Wait 2 seconds, then delete
          setTimeout(() => {
            let deleteIndex = role.length;
            const deleting = setInterval(() => {
              if (deleteIndex >= 0) {
                setDisplayRole(role.slice(0, deleteIndex));
                deleteIndex--;
              } else {
                clearInterval(deleting);
              }
            }, 50);
          }, 2000);
        }
      }, 100);

      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 5000);

    return () => clearInterval(roleInterval);
  }, [currentRoleIndex]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="home">
      {/* Animated Background Container */}
      <div className="animated-bg">
        <div className="bg-particle-1"></div>
        <div className="bg-particle-2"></div>
        <div className="bg-particle-3"></div>
      </div>
    
 

      <div className="home-content">
        <div className="text-content fade-in">
          <h1 className="home-title">
            Hi, I'm <span className="name-animation">{displayText}</span>
            <span className="cursor">|</span>
          </h1>
          <h2 className="home-subtitle">{displayRole}</h2>
          <p className="home-description">
            Passionate about creating innovative solutions that bridge technology 
            and real-world challenges through clean code and thoughtful design.
          </p>
          <div className="home-buttons">
            <button className="btn primary" onClick={() => scrollToSection('projects')}>View My Work</button>
            <button className="btn secondary" onClick={() => scrollToSection('contact')}>Get In Touch</button>
          </div>
        </div>

        <div className="image-content fade-in">
          <div className="profile-image">
            <img 
              src={`${process.env.PUBLIC_URL}/Assets/my photo2.jpg`} 
              alt="Ronald Kimutai" 
              className="profile-photo"
            />
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <span>Scroll down</span>
        <div className="arrow"></div>
      </div>
    </section>
  );
};

export default Home;