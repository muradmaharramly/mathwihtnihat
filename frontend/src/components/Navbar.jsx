import React, { useState, useEffect } from 'react';
import { FiMenu, FiX, FiFacebook, FiYoutube, FiTwitter } from 'react-icons/fi';
import api from '../api';
import './Navbar.scss';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [socialMedia, setSocialMedia] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    const fetchSocials = async () => {
      try {
        const res = await api.get('/public/social_media');
        setSocialMedia(res.data);
      } catch (err) {
        console.error('Error fetching socials', err);
      }
    };

    window.addEventListener('scroll', handleScroll);
    fetchSocials();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <div className="logo" onClick={() => window.scrollTo(0, 0)}>
          Math<span>Portfolio</span>
        </div>
        
        <div className={`nav-links-wrapper ${menuOpen ? 'active' : ''}`}>
          
          <ul className="nav-links">
            <li onClick={() => scrollTo('services')}>Xidmətlər</li>
            <li onClick={() => scrollTo('advantages')}>Üstünlüklər</li>
            <li onClick={() => scrollTo('testimonials')}>Rəylər</li>
            <li onClick={() => scrollTo('faq')}>FAQ</li>
            <li className="nav-btn" onClick={() => scrollTo('contact')}>Əlaqə</li>
          </ul>
        </div>

        {menuOpen && <div className="mobile-overlay" onClick={() => setMenuOpen(false)}></div>}

        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
