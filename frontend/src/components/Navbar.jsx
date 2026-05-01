import React, { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import './Navbar.scss';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
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
        
        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li onClick={() => scrollTo('services')}>Xidmətlər</li>
          <li onClick={() => scrollTo('advantages')}>Üstünlüklər</li>
          <li onClick={() => scrollTo('testimonials')}>Rəylər</li>
          <li onClick={() => scrollTo('faq')}>FAQ</li>
          <li className="nav-btn" onClick={() => scrollTo('contact')}>Əlaqə</li>
        </ul>

        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
