import React, { useState } from 'react';
import './Projects.css';

// Import your project images
import brillzImage1 from '../assets/brillz1.png';
import brillzImage2 from '../assets/brillz2.png';
import brillzImage3 from '../assets/brillz3.png';
import ronnImage1 from '../assets/ronn1.png';
import ronnImage2 from '../assets/ronn2.png';
import ronnImage3 from '../assets/ronn3.png';

const Projects = () => {
  const [activeImageIndex, setActiveImageIndex] = useState({});
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxImage, setLightboxImage] = useState('');

  const projects = [
    {
      id: 1,
      title: "Student Records Database System",
      description: "A high-performance PostgreSQL database system for managing university student records with 200,000+ students and 1,000,000+ enrollments. Features partitioned tables, comprehensive audit system, advanced indexing, and materialized views.",
      images: ["https://www.postgresql.org/media/img/about/press/elephant.png"],
      technologies: ["PostgreSQL", "Python", "Database Design", "Performance Optimization"],
      github: "https://github.com/Ronaldkim807/student-records-db",
      demo: "https://github.com/Ronaldkim807/student-records-db"
    },
    {
      id: 2,
      title: "Brillz Motors Website",
      description: "A powerful web application for vehicle importation, car trade-ins, and secure online transactions. Features user authentication, car importation system, trade-in system, secure payments, and file uploads.",
      images: [brillzImage1, brillzImage2, brillzImage3],
      technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
      github: "https://github.com/Ronaldkim807/Brillz-motors-website",
      demo: "https://github.com/Ronaldkim807/Brillz-motors-website"
    },
    {
      id: 3,
      title: "Ronn Online Ordering System",
      description: "A web-based platform that allows users to browse products, register accounts, place orders, and manage orders conveniently. Features user authentication, product browsing, and order management system.",
      images: [ronnImage1, ronnImage2, ronnImage3],
      technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
      github: "https://github.com/Ronaldkim807/Ronn-online-ordering",
      demo: "https://github.com/Ronaldkim807/Ronn-online-ordering"
    }
  ];

  const handleNextImage = (projectId, totalImages) => {
    setActiveImageIndex(prev => ({
      ...prev,
      [projectId]: (prev[projectId] || 0) + 1 >= totalImages ? 0 : (prev[projectId] || 0) + 1
    }));
  };

  const handlePrevImage = (projectId, totalImages) => {
    setActiveImageIndex(prev => ({
      ...prev,
      [projectId]: (prev[projectId] || 0) - 1 < 0 ? totalImages - 1 : (prev[projectId] || 0) - 1
    }));
  };

  const openLightbox = (image) => {
    setLightboxImage(image);
    setShowLightbox(true);
  };

  const closeLightbox = () => {
    setShowLightbox(false);
    setLightboxImage('');
  };

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title fade-in">My Projects</h2>
        <div className="projects-grid">
          {projects.map((project) => {
            const currentIndex = activeImageIndex[project.id] || 0;
            const totalImages = project.images.length;
            
            return (
              <div key={project.id} className="project-card fade-in">
                <div className="project-image">
                  <img 
                    src={project.images[currentIndex]} 
                    alt={`${project.title} - Screenshot ${currentIndex + 1}`}
                    onClick={() => openLightbox(project.images[currentIndex])}
                  />
                  
                  {totalImages > 1 && (
                    <>
                      <button 
                        className="carousel-btn prev"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrevImage(project.id, totalImages);
                        }}
                      >
                        &#8249;
                      </button>
                      <button 
                        className="carousel-btn next"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNextImage(project.id, totalImages);
                        }}
                      >
                        &#8250;
                      </button>
                      <div className="image-counter">
                        {currentIndex + 1} / {totalImages}
                      </div>
                    </>
                  )}
                  
                  <div className="project-overlay">
                    <div className="project-links">
                      <a href={project.github} className="project-link" target="_blank" rel="noopener noreferrer">GitHub</a>
                      <a href={project.demo} className="project-link" target="_blank" rel="noopener noreferrer">Live Demo</a>
                    </div>
                  </div>
                </div>
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-technologies">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showLightbox && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content">
            <img src={lightboxImage} alt="Project screenshot" />
            <button className="lightbox-close" onClick={closeLightbox}>
              &times;
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;