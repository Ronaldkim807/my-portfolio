import React, { useEffect, useState } from 'react';
import './About.css';
import resumeFile from '../assets/Ronald_Kimutai_Resume.pdf';

const About = () => {
  const [currentImage, setCurrentImage] = useState(0);

  // University images
  const uniImages = [
    require('../assets/kca1.png'),
    require('../assets/kca2.png'),
    require('../assets/kca3.png')
  ];

  // Certifications data
  const certifications = [
    {
      id: 1,
      title: "Network Support and Security",
      issuer: "Cisco",
      issued: "Sep 2025",
      skills: ["CCNA", "Network Security", "Help Desk Support", "Endpoint Devices", "Cisco Firewall Security", "Windows Firewall", "Cybersecurity"],
      logo: "cisco-logo"
    },
    {
      id: 2,
      title: "Python Essentials 1",
      issuer: "Cisco",
      issued: "Feb 2025",
      skills: ["PostgreSQL", "Jupyter Notebook", "SQL Optimization"],
      logo: "cisco-logo"
    },
    {
      id: 3,
      title: "Data Analytics Essentials",
      issuer: "Cisco",
      issued: "Jan 2025",
      skills: ["Data Analysis", "Python", "Statistical Modeling"],
      logo: "cisco-logo"
    }
  ];

  // Skills data organized by category
  const skillCategories = [
    {
      category: "Programming Languages",
      skills: ["JavaScript", "Python", "PHP", "SQL", "HTML/CSS", "Java"]
    },
    {
      category: "Frameworks & Libraries",
      skills: ["React", "Node.js", "Express", "Bootstrap", "jQuery", "TailwindCSS"]
    },
    {
      category: "Databases",
      skills: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"]
    },
    {
      category: "Tools & Technologies",
      skills: ["Git/GitHub", "VS Code", "Figma", "Postman", "Docker", "RESTful APIs"]
    },
    {
      category: "Networking & Security",
      skills: ["CCNA", "Network Security", "Cybersecurity", "Firewall Configuration"]
    },
    {
      category: "Data Analysis",
      skills: ["Data Analytics", "Jupyter Notebook", "SQL Optimization", "Statistical Analysis"]
    }
  ];

  useEffect(() => {
    // Fade-in animation on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    const handleScroll = () => {
      fadeElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Change images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % uniImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [uniImages.length]);

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = resumeFile;
    link.download = 'Ronald_Kimutai_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewResume = () => {
    window.open(resumeFile, '_blank');
  };

  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title fade-in">Education & Professional Profile</h2>
        
        {/* University Section */}
        <div className="university-section fade-in">
          <div className="education-header">
            <h3>KCA University</h3>
            <p className="education-subtitle">Main Campus, Nairobi</p>
            <p className="education-duration">2022 - 2026 (Expected)</p>
          </div>
          
          <div className="university-content">
            <div className="university-image">
              <img
                src={uniImages[currentImage]}
                alt="KCA University Campus"
              />
              <div className="university-status">
                <i className="fas fa-graduation-cap"></i>
                <span>Currently studying Bachelor of Science in Information Technology</span>
              </div>
            </div>
            
            <div className="university-description">
              <p>
                KCA University offers a comprehensive Information Technology program that blends 
                theoretical knowledge with practical application. The curriculum covers advanced 
                topics in software development, database management, networking, cybersecurity, 
                and emerging technologies.
              </p>
              <div className="key-focus-areas">
                <h4>Key Focus Areas:</h4>
                <ul>
                  <li>Software Engineering & Development</li>
                  <li>Database Design & Management</li>
                  <li>Network Infrastructure & Security</li>
                  <li>Web & Mobile Application Development</li>
                  <li>Data Analytics & Business Intelligence</li>
                  <li>Cloud Computing & DevOps</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="skills-section fade-in">
          <h3>Technical Skills & Competencies</h3>
          <div className="skills-grid">
            {skillCategories.map((category, index) => (
              <div key={index} className="skill-category">
                <h4>{category.category}</h4>
                <div className="skills-list">
                  {category.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div className="certifications-section fade-in">
          <h3>Licenses & Certifications</h3>
          <div className="certifications-grid">
            {certifications.map((cert) => (
              <div key={cert.id} className="certification-card">
                <div className="cert-header">
                  <div className="cert-logo">
                    <i className="fab fa-cisco"></i>
                  </div>
                  <div className="cert-info">
                    <h4>{cert.title}</h4>
                    <p className="cert-issuer">{cert.issuer}</p>
                    <p className="cert-date">Issued {cert.issued}</p>
                  </div>
                </div>
                <div className="cert-skills">
                  <span className="skills-label">Skills:</span>
                  <div className="skill-tags">
                    {cert.skills.map((skill, index) => (
                      <span key={index} className="skill-tag small">{skill}</span>
                    ))}
                  </div>
                </div>
                <button className="view-credential-btn">
                  <i className="fas fa-external-link-alt"></i>
                  Show credential
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Resume Section */}
        <div className="resume-section fade-in">
          <div className="resume-content">
            <h3>Professional Resume</h3>
            <p>
              Download my complete resume to explore my full professional background, 
              project experiences, and detailed qualifications.
            </p>
            <div className="resume-buttons">
              <button className="btn primary" onClick={handleViewResume}>
                <i className="fas fa-eye"></i> View Resume
              </button>
              <button className="btn secondary" onClick={handleDownloadResume}>
                <i className="fas fa-download"></i> Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;