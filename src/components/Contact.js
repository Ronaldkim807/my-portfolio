// src/components/Contact.js
import React, { useState, useEffect } from 'react';
import './Contact.css';
import backgroundGif from '../assets/3.gif';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    // set background CSS variable if you want
    document.documentElement.style.setProperty('--contact-bg', `url(${backgroundGif})`);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error('Contact API error', data);
        setSubmitStatus({ status: 'error', message: data?.error || 'Failed to send message' });
      } else {
        setSubmitStatus({ status: 'success', message: data?.message || 'Message sent' });
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (err) {
      console.error('Network error', err);
      setSubmitStatus({ status: 'error', message: 'Network error. Try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-content">
          <div className="contact-info">
            <h3>Let's Connect</h3>
            <p>
              I'm open to internships and collaborations. Send me a message and I'll get back to you.
            </p>
            <div className="contact-details">
              <div className="contact-item"><i className="fas fa-envelope"></i><span>kimutaironald48@gmail.com</span></div>
              <div className="contact-item"><i className="fas fa-phone"></i><span>+254 716012357</span></div>
              <div className="contact-item"><i className="fas fa-map-marker-alt"></i><span>Nairobi, Kenya</span></div>
            </div>
            <div className="social-links">
              {/* social links */}
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" value={formData.name} onChange={handleChange} className={errors.name ? 'error' : ''} />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" value={formData.email} onChange={handleChange} className={errors.email ? 'error' : ''} />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} className={errors.message ? 'error' : ''} />
              {errors.message && <span className="error-text">{errors.message}</span>}
            </div>

            <button type="submit" className={`btn primary send-button ${isSubmitting ? 'submitting' : ''}`} disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {submitStatus?.status === 'success' && <div className="status-message success">{submitStatus.message}</div>}
            {submitStatus?.status === 'error' && <div className="status-message error">{submitStatus.message}</div>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
